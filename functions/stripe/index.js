const { handleRegistraionPayment } = require('./payment');
const {
  createStripeSellerAccount,
  retryStripeSellerAccount,
  deleteStripeSellerAccount
} = require('./seller');

/**
 * Export all stripe cloud functions.
 */
exports = {
  handleRegistraionPayment,
  createStripeSellerAccount,
  retryStripeSellerAccount,
  deleteStripeSellerAccount
};
