const functions = require('firebase-functions');
const fetch = require('node-fetch');
const { Stripe } = require('stripe');

/**
 * Get the stripe user id of a seller when they connect their stripe account to
 * the Code Contest marketplace and store it in the stripeSellers collection.
 */
const connectStripeSeller = async (snap, context) => {
  const { authCode } = snap.data();
  const { secret } = envCreds(context);

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
        Authorization: `Bearer ${secret}`
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
  .onUpdate(({ after }, context) => {
    if (!after.data().stripeID) connectStripeSeller(after, context);
    return 0;
  });

/**
 * Deauthorize the stripe account of a seller when they delete their account.
 */
exports.deleteStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onDelete(async (snap, context) => {
    const { stripeID } = snap.data();
    const { clientId, secret } = envCreds(context);
    let res = await fetch('https://connect.stripe.com/oauth/deauthorize', {
      method: 'POST',
      body: JSON.stringify({ client_id: clientId, stripe_user_id: stripeID }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${secret}`
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
  .onCreate(async (snap, context) => {
    const { adminId, secret } = envCreds(context);
    const stripe = new Stripe(secret);
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
        if (stripeID === adminId) charge = await stripe.charges.create(chargeData);
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
      const allowedStripeCodes = [
        'card_declined',
        'incorrect_cvc',
        'expired_card',
        'processing_error',
        'incorrect_number'
      ];
      let errorMessage = `${error}`;
      let status = 'failed';
      let logFullError = true;
      if (error instanceof UnwrapError) {
        // Handle Unwrap Errors
        const unwrapMessage = UnwrapMessages[error.stage];
        console.error(unwrapMessage, error.key, error.value);
        errorMessage = unwrapMessage;
        logFullError = false;
      } else if (allowedStripeCodes.includes(error.code)) {
        // Handle Stripe Card Errors
        console.error('Stripe Error:', error.code, error.message);
        errorMessage = error.message;
        status = error.code;
        logFullError = false;
      }
      await snap.ref.update({ error: errorMessage, status });
      console.error('Handle Registration Payment Failed!');
      if (logFullError) console.error('->', error);
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
              if (Object.keys(docData).includes(dm) && docData[dm] !== null) data[dm] = docData[dm];
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
    const dPrice =
      discountType === '$' ? price - discountAmount : price * (0.01 * (100 - discountAmount));
    total = price * numOfFullPrice + dPrice * numOfDiscounts;
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

/**
 * Get stripe credentials for the env that is being used.
 */
const envCreds = ({ params: { env } }) => {
  // eslint-disable-next-line camelcase
  const { admin_id, secret, client_id } = functions.config().stripe;
  return env === 'PRODUCTION'
    ? {
        // Production Credentials
        adminId: admin_id.prod,
        clientId: client_id.prod,
        secret: secret.prod
      }
    : {
        // Development Credentials
        adminId: admin_id.test,
        clientId: client_id.test,
        secret: secret.test
      };
};
