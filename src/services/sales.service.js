const { salesModel, productsModel } = require('../models');

const findIdExist = async (arraySales) => {
  const products = await Promise.all(
    arraySales.map(async ({ productId }) => {
      const product = await productsModel.findById(productId);
      if (!product) return false;
      return true;
    }),
  );

  if (products.some((e) => e === false)) { 
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: '' };
};

const insert = async (arraySales) => {
  const error = await findIdExist(arraySales);
  if (error.type) return error;

  const result = await salesModel.insert(arraySales);

  return { type: null, message: result };
};

module.exports = {
  insert,
};