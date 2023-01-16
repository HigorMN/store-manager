const { productsModel } = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productsModel.findAll(); 

  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const product = await productsModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: product };
};

const insert = async (product) => {
  const insertId = await productsModel.insert(product);
  const newProduct = await productsModel.findById(insertId);

  return { type: null, message: newProduct };
};

const updateById = async (name, id) => {
  const { type, message } = await findById(id);
  
  if (type) return { type, message };

  await productsModel.updateById(name, id);

  return { type: null, message: { id, name } };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};