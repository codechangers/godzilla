const functions = require('firebase-functions');
const { Stripe } = require('stripe');

const ADMIN_STRIPE_ID = functions.config().stripe.admin_id;
const CLIENT_SECERET = functions.config().stripe.secret;
const CLIENT_ID = functions.config().stripe.client_id;

const stripe = new Stripe(CLIENT_SECERET);

/**
 * Get the stripe user id of a seller when they connect their stripe account to
 * the Code Contest marketplace and store it in the stripeSellers collection.
 */
exports.createStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onCreate(async (snap, context) => {
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
    const { stripeToken, classRef, seller, parent, promo, kidsToRegister } = snap.data();
    // TODO: Add null checks for all this stuff...
    const { stripeID } = await seller.get().data();
    const { price, name, teacher } = await classRef.get().data();
    const { fName, lName, email } = await parent.get().data();
    const [validPromo, promoData] = isPromoValid(promo, teacher.id);
    const { discountType, discountAmount, uses, limited, startUses } = promoData;
    try {
      // Calculate total price with discounts.
      let total = 0;
      let numOfDiscounts = 0;
      const regCount = kidsToRegister.length;
      if (validPromo) {
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
      // Create and run stripe charge.
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
            { stripe_account: stripeID }
          );
        }
        await snap.ref.update({ status: charge.status });
        if (charge.status === 'succeeded') {
          // Save kids to class.children list.
          const currentRegisrations = (await classRef.get().data().children) || [];
          await classRef.update({ children: [...currentRegisrations, ...kidsToRegister] });
          // Save class to kids.classes lists.
          Promise.all(
            kidsToRegister.map(async kid => {
              const currentClasses = (await kid.get().data().classes) || [];
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
      // Tick promo code uses.
      if (numOfDiscounts > 0) {
        if (limited) await promo.ref.update({ uses: atLeastZero(uses - numOfDiscounts) });
        else await promo.ref.update({ startUses: startUses + numOfDiscounts });
      }
    } catch (error) {
      await snap.ref.update({ error, status: 'failed' });
      console.error('Handle Registration Payment Failed!', error);
    }
  });

/**
 * Check if a promo code is valid for the given teacher.
 */
const isPromoValid = async (promo, teacherId) => {
  if (promo !== null) {
    const promoDoc = await promo.get();
    if (
      promoDoc !== null &&
      promoDoc.exists &&
      promoDoc.data().teacher.id === teacherId &&
      promoDoc.data().active &&
      !promoDoc.data().deletedOn
    )
      return [true, promoDoc.data()];
  }
  return [false, {}];
};

/**
 * Round a given number up to zero.
 */
const atLeastZero = num => (num > 0 ? num : 0);
