const express = require('express');
const { salesController } = require('../controllers');
const validateProfuctId = require('../middlewares/validateProductId');
const validateQuantity = require('../middlewares/validateQuantity');

const router = express.Router();

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getByIdSales);
router.post('/', validateProfuctId, validateQuantity, salesController.newSales);

module.exports = router;