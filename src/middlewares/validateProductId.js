module.exports = (req, res, next) => {
  const sales = req.body;

  sales.map(({ productId }) => {
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    return next();
  });
};