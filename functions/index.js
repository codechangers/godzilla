const functions = require('firebase-functions');

const CLIENT_SECERET = functions.config().stripe.secret;

/**
 * Get the stripe user id of a seller when they connect their stripe account to
 * the Code Contest marketplace and store it in the stripeSellers collection.
 */
exports.createStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onCreate(async (snap, context) => {
    const { auth_code } = snap.data();

    const handleError = async error => {
      await snap.ref.update({ error });
      console.error('Create Stripe Seller Account Failed!', error);
    };

    try {
      // Fetch the stripe_user_id of the new seller.
      let res = await fetch('https://connect.stripe.com/oauth/token', {
        method: 'POST',
        body: JSON.stringify({ code: auth_code, grant_type: 'authorization_code' }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CLIENT_SECERET}`
        }
      });
      res = await res.json();
      if (res.error) handleError(res.error);
      else {
        // Save the stripe_user_id of the new seller.
        const { stripe_user_id } = res;
        const { sellerId } = context.params;
        await snap.ref.set({ stripeID: stripe_user_id });
        console.log('Successfully Created Stripe Seller Account!', sellerId);
      }
    } catch (error) {
      handleError(error);
    }
  });
