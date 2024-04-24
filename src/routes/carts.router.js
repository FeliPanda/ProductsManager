const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/carts.controller');



router.get('/:cid', cartsController.getCart);
router.put('/:cid', cartsController.updateCart);
router.put('/:cid/products/:pid', cartsController.updateProductQuantity);
router.delete('/:cid/products/:pid', cartsController.removeProductFromCart);
router.delete('/:cid', cartsController.clearCart);
router.post("/:cid/add-to-cart", cartsController.addToCart);


module.exports = router;
