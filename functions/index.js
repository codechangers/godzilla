const functions = require('firebase-functions');
const fetch = require('node-fetch');
const { Stripe } = require('stripe');

const ADMIN_STRIPE_ID = functions.config().stripe.admin_id;
const CLIENT_SECERET = functions.config().stripe.secret;
const CLIENT_ID = functions.config().stripe.client_id;

const stripe = new Stripe(CLIENT_SECERET);

/**
 * Get the stripe user id of a seller when they connect their stripe account to
 * the Code Contest marketplace and store it in the stripeSellers collection.
 */
const connectStripeSeller = async (snap, context) => {
  const { authCode } = snap.data();

  const handleError = async error => {
    await snap.ref.update({ error: error || 'Create Stripe Account Failed!' });
    console.error('Create Stripe Seller Account Failed!', error);
  };

  try {
    // Fetch the stripe_user_id of the new seller.
    let res = await fetch('https://connect.stripe.com/oauth/token', {
      method: 'POST',
      body: JSON.stringify({ code: authCode, grant_type: 'authorization_code' }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CLIENT_SECERET}`
      }
    });
    res = await res.json();
    if (res.error) handleError(res.error);
    else {
      // Save the stripe_user_id of the new seller.
      const { stripe_user_id } = res; // eslint-disable-line
      const { sellerId } = context.params;
      await snap.ref.set({ stripeID: stripe_user_id });
      console.log('Successfully Created Stripe Seller Account!', sellerId);
    }
  } catch (error) {
    handleError(error);
  }
};
// Run onCreate
exports.createStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onCreate(connectStripeSeller);
// Allow retry onUpdate
exports.retryStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onUpdate(({ before, after }, context) => {
    if (!before.data().stripeID) connectStripeSeller(after, context);
    return 0;
  });

/**
 * Deauthorize the stripe account of a seller when they delete their account.
 */
exports.deleteStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onDelete(async snap => {
    const { stripeID } = snap.data();
    let res = await fetch('https://connect.stripe.com/oauth/deauthorize', {
      method: 'POST',
      body: JSON.stringify({ client_id: CLIENT_ID, stripe_user_id: stripeID }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CLIENT_SECERET}`
      }
    });
    res = await res.json();
    if (res.error) console.error('Delete Stripe Seller Account Failed!', res.error);
    else console.log('Successfully Deleted Stripe Seller Account.', snap.id);
  });

/**
 * Handle payment for class registration, and save kids to class upon successful transaction.
 */
exports.handleRegistraionPayment = functions.firestore
  .document('/env/{env}/payments/{paymentId}')
  .onCreate(async snap => {
    try {
      const data = await getTransactionData(snap.data());
      const [total, numOfDiscounts] = getTotalWithDiscount(data);
      const { stripeToken, stripeID, email, fName, lName, regCount, name, kidsToRegister } = data;
      const { classRef, promo } = snap.data();
      if (total > 0) {
        const chargeData = {
          amount: total * 100,
          currency: 'usd',
          description: `${fName} ${lName} paying for ${regCount} registration(s) for ${name}`,
          source: stripeToken,
          receipt_email: email
        };
        let charge = null;
        // Create charge with no fee for market owner.
        if (stripeID === ADMIN_STRIPE_ID) charge = await stripe.charges.create(chargeData);
        else {
          // Create charge with fee for everyone else.
          charge = await stripe.charges.create(
            {
              ...chargeData,
              application_fee_amount: 1000 * regCount
            },
            { stripeAccount: stripeID }
          );
        }
        await snap.ref.update({ status: charge.status });
        if (charge.status === 'succeeded') {
          // Save kids to class.children list.
          const classDoc = await classRef.get();
          const currentRegisrations = classDoc.data().children || [];
          await classRef.update({ children: [...currentRegisrations, ...kidsToRegister] });
          // Save class to kids.classes lists.
          Promise.all(
            kidsToRegister.map(async kid => {
              const kidDoc = await kid.get();
              const currentClasses = kidDoc.data().classes || [];
              await kid.update({ classes: [...currentClasses, classRef] });
            })
          );
          console.log('Successfully Handled Registration Payment!', chargeData.description);
        } else {
          console.error(
            'Stripe Payment Failed!',
            charge.status,
            charge.failure_code,
            charge.failure_message
          );
        }
      }
      await tickPromo(numOfDiscounts, promo, data);
    } catch (error) {
      let errorMessage = `${error}`;
      if (error instanceof UnwrapError) {
        const unwrapMessage = UnwrapMessages[error.stage];
        console.error(unwrapMessage, error.key, error.value);
        errorMessage = unwrapMessage;
      }
      await snap.ref.update({ error: errorMessage, status: 'failed' });
      console.error('Handle Registration Payment Failed!', error);
    }
  });

/**
 * Check if a promo code is valid for the given teacher.
 */
function isPromoValid(promoRef, data, { promo }) {
  const { teacher } = data;
  if (promoRef !== null) {
    if (
      promo &&
      promo.exists &&
      promo.data().teacher.id === teacher.id &&
      promo.data().active &&
      !promo.data().deletedOn
    )
      return true;
  }
  return false;
}

/**
 * Round a given number up to zero.
 */
const atLeastZero = num => (num > 0 ? num : 0);

const UnwrapMessages = [
  'This key is missing from the snapshot!',
  'This key has a value of null but is not listed in the canBeNull whitelist!',
  'This key has a reference to a document that does not exist!',
  'This data memeber is either not present or null!'
];

class UnwrapError extends Error {
  constructor(message, stage, key, value) {
    super(message);
    this.key = key;
    this.value = value;
    this.stage = stage;
  }
}

/**
 * Safely unwrap all snapshot data required for a transaction.
 */
async function getTransactionData(snapData) {
  const { stripeToken, kidsToRegister } = snapData;
  const data = { stripeToken, kidsToRegister, regCount: kidsToRegister.length };
  const m = 'Failed to unwrap data!';
  const canBeNull = ['promo'];
  const dataToUnwrap = {
    seller: ['stripeID'],
    classRef: ['price', 'name', 'teacher'],
    parent: ['fName', 'lName', 'email'],
    promo: ['discountType', 'discountAmount', 'uses', 'limited', 'startUses']
  };
  const documents = {};
  // Unwrap data from firestore references.
  // Throw an UnwrapError if any stage required data is invalid.
  await Promise.all(
    // Loop through required references.
    Object.entries(dataToUnwrap).map(async ([key, dataMembers]) => {
      // Is the reference in our snapshot?
      if (Object.keys(snapData).includes(key)) {
        // Is our reference null?
        if (snapData[key] !== null) {
          const doc = await snapData[key].get();
          // Is our reference a real document?
          if (doc.exists) {
            documents[key] = doc;
            const docData = doc.data();
            // Loop through required data members.
            dataMembers.forEach(dm => {
              // Is the data memeber valid?
              if (docData.includes(dm) && docData[dm] !== null) data[dm] = docData[dm];
              else throw new UnwrapError(m, 3, `${key}.${dm}`, snapData[key]);
            });
          } else throw new UnwrapError(m, 2, key, snapData[key]);
        } else if (!canBeNull.includes(key)) throw new UnwrapError(m, 1, key, snapData[key]);
      } else throw new UnwrapError(m, 0, key, null);
    })
  );
  data.validPromo = isPromoValid(snapData.promo, data, documents);
  return data;
}

/**
 * Calculate the total price of a transaction with discounts.
 */
function getTotalWithDiscount(data) {
  const { regCount, price, validPromo } = data;
  let total = 0;
  let numOfDiscounts = 0;
  if (validPromo) {
    const { uses, limited, discountType, discountAmount } = data;
    numOfDiscounts = regCount > uses && limited ? uses : regCount;
    const numOfFullPrice = regCount - numOfDiscounts;
    total =
      discountType === '$'
        ? // ($10 * 10kids) - (5discounts * $5) = $100 - $25 => $75
          price * regCount - numOfDiscounts * discountAmount
        : // ($10 * 5kids) + ($10 * 5discounts * 0.01 * 50) = $50 + $25 => $75
          price * numOfFullPrice + price * numOfDiscounts * 0.01 * discountAmount;
  } else total = price * regCount;
  total = atLeastZero(total);
  numOfDiscounts = atLeastZero(numOfDiscounts);
  return [total, numOfDiscounts];
}

/**
 * Update the number of uses available for a promo code.
 */
async function tickPromo(numOfDiscounts, promoRef, { uses, startUses, limited }) {
  if (numOfDiscounts > 0) {
    if (limited) await promoRef.update({ uses: atLeastZero(uses - numOfDiscounts) });
    else await promoRef.update({ startUses: startUses + numOfDiscounts });
  }
}
