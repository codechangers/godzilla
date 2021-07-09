const { atLeastZero } = require('./helpers');

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
 * Update the number of uses available for a promo code.
 */
async function tickPromo(numOfDiscounts, promoRef, { uses, startUses, limited }) {
  if (numOfDiscounts > 0) {
    if (limited) await promoRef.update({ uses: atLeastZero(uses - numOfDiscounts) });
    else await promoRef.update({ startUses: startUses + numOfDiscounts });
  }
}

exports = { isPromoValid, tickPromo };
