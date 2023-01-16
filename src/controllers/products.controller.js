const { productsService } = require('../services');

const listProducts = async (_req, res) => {
  const { message } = await productsService.findAll();

  res.status(200).json(message);
};

const getProfuct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.findById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const newProduct = async (req, res) => {
  const { name } = req.body;

  const { message } = await productsService.insert(name);

  return res.status(201).json(message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateById(name, id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteById(id);

  if (type) return res.status(404).json({ message });

  return res.status(204).json();
};

module.exports = {
  listProducts,
  getProfuct,
  newProduct,
  updateProductById,
  deleteById,
};