const { salesService } = require('../services');

const newSales = async (req, res) => {
  const { type, message } = await salesService.insert(req.body);
  
  if (type) return res.status(404).json({ message });

  return res.status(201).json(message);
};

const getAllSales = async (_req, res) => {
  const { message } = await salesService.findAll();

  return res.status(200).json(message);
};

const getByIdSales = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.findById(id);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  
  const { type, message } = await salesService.deleteById(id);

  if (type) return res.status(404).json({ message });

  return res.status(204).json();
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.updateById(id, req.body);

  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  newSales,
  getAllSales,
  getByIdSales,
  deleteById,
  updateById,
};