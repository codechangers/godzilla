const functions = require('firebase-functions');
const stripe = require('./stripe');

/* =====================
 * == Stripe Payments ==
 * ===================== */

// Handle Registration.
exports.handleRegistrationPayment = functions.firestore
  .document('/env/{env}/payments/{paymentId}')
  .onCreate(stripe.payments.handleRegistration);

/* ============================
 * == Stripe Seller Accounts ==
 * ============================ */

// Handle Create.
exports.createStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onCreate(stripe.sellers.connect);

// Handle Retry.
exports.retryStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onUpdate(stripe.sellers.retryConnect);

// Handle Delete.
exports.deleteStripeSellerAccount = functions.firestore
  .document('/env/{env}/stripeSellers/{sellerId}')
  .onDelete(stripe.sellers.disconnect);
