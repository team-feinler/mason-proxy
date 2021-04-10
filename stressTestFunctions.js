const faker = require('faker');

const randomNumber = (lowerLimit, upperLimit) => {
  return faker.datatype.number({min: lowerLimit, max: upperLimit});
};

const generateOneRecord = () => {
  let newRecordToAddToDatabase = {
    productId: randomNumber(10000001, 11000000),
    price: randomNumber(0, 500),
    inventory: randomNumber(0, 100)
  };
  return newRecordToAddToDatabase;
};

// for GET PUT DELETE routes
const generateURLwithProductId = function (requestParams, context, ee, next) {
  const newUrl = `/priceandinventory/id/${randomNumber(9000000, 10000000)}`;
  requestParams.url = newUrl;
  return next();
};

// for POST route
const createRequestBody = function (requestParams, context, ee, next) {
  const newRecord = generateOneRecord();
  requestParams.json = newRecord;
  return next();
};

module.exports = {generateURLwithProductId, createRequestBody};