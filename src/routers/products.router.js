const express = require('express');
const { productsController } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productsController.listProducts);
router.get('/:id', productsController.getProfuct);
router.post('/', validateName, productsController.newProduct);
router.put('/:id', validateName, productsController.updateProductById);
router.delete('/:id', productsController.deleteById);

module.exports = router;