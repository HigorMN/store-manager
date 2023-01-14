const { salesService } = require('../services');

const newSales = async (req, res) => {
  const { type, message } = await salesService.insert(req.body);
  
  if (type) return res.status(404).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  newSales,
};