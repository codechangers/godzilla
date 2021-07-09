const { Stripe } = require('stripe');
const { tickPromo } = require('./promos');
const { registerForClass, UnwrapError, UnwrapMessages } = require('./helpers');
const { getTransactionData, getTotalWithDiscount } = require('./transactions');
const { envCreds } = require('../utils/creds');

/**
 * Handle payment for class registration, and save kids to class upon successful transaction.
 */
async function handleRegistration(snap, context) {
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
        await registerForClass(classRef, kidsToRegister, chargeData.description);
      } else {
        console.error(
          'Stripe Payment Failed!',
          charge.status,
          charge.failure_code,
          charge.failure_message
        );
      }
    } else {
      // Handle $0 transactions.
      await snap.ref.update({ status: 'succeeded' });
      await registerForClass(classRef, kidsToRegister, '$0 payment (free registration)');
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
}

exports = { handleRegistration };
