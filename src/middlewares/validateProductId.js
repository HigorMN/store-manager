module.exports = (req, res, next) => {
  const sales = req.body.map(({ productId }) => {
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    return true;
  });

  if (sales.every((e) => e === true)) {
   return next(); 
  }
};