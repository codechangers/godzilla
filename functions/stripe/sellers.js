const fetch = require('node-fetch');
const { envCreds } = require('../utils/creds');

/**
 * Get the stripe user id of a seller when they connect their stripe account to
 * the Code Contest marketplace and store it in the stripeSellers collection.
 */
async function connect(snap, context) {
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
}

/**
 * After an unsuccessful attempt, retry to connect the stripe seller account.
 */
function retryConnect({ after }, context) {
  if (!after.data().stripeID) connect(after, context);
  return 0;
}

/**
 * Deauthorize the stripe account of a seller when they delete their account.
 */
async function disconnect(snap, context) {
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
}

module.exports = { connect, retryConnect, disconnect };
