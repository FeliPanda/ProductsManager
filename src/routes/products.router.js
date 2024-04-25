const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/:pid/add-to-cart', productsController.addToCartFromProductList);
router.get('/search', productsController.getProductByTitle);


module.exports = router;
