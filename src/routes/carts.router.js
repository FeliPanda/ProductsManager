const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose');
const Cart = require('../models/carts.model.js');

router.get('/', async (req, res) => {
    try {
        const cartManager = req.app.get('cartManager');
        const carts = await cartManager.getCarts();

        if (!carts.length) {
            return res.status(204).send("No carts found");
        }

        // Mapear cada carrito solo con el método toObject
        const cleanedCarts = carts.map(cart => cart.toObject({ virtuals: true }));

        res.json(cleanedCarts);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});



router.post('/', async (req, res) => {
    try {
        const cartManager = req.app.get('cartManager'); // Obtener cartManager

        const newCart = await cartManager.addCart();

        res.status(201).json(newCart);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartManager = req.app.get('cartManager'); // Obtener cartManager

        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body && req.body.quantity ? req.body.quantity : 1;

        await cartManager.addProductToCart(cartId, productId, quantity);

        res.status(201).send("Product added to cart successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;