const { salesModel, productsModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

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

const findAll = async () => {
  const result = await salesModel.findAll();

  return { type: null, message: result };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const result = await salesModel.findById(id);

  if (result.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: result };
};

const deleteById = async (id) => {
  const { type, message } = await findById(id);

  if (type) return { type, message };

  await salesModel.deleteById(id);

  return { type: null, message: null };
};

const updateById = async (id, arraySales) => {
  const error = await findIdExist(arraySales);
  if (error.type) return error;

  const { type, message } = await findById(id);

  if (type) return { type, message };

  const result = await salesModel.updateById(id, arraySales);

  return { type: null, message: result };
};

module.exports = {
  insert,
  findAll,
  findById,
  deleteById,
  updateById,
};