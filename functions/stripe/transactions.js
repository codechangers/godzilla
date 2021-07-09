const { atLeastZero, UnwrapError } = require('./helpers');
const { isPromoValid } = require('./promos');

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

module.exports = { getTransactionData, getTotalWithDiscount };
