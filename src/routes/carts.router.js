const express = require("express");
const CartManager = require("../cartManager");
const router = express.Router();


const cartManager = new CartManager();

router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();

        if (!carts.length) {
            return res.status(204).send("No carts found");
        }

        res.json(carts);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1; // Default quantity is 1

        await cartManager.addProductToCart(cartId, productId, quantity);

        res.status(201).send("Product added to cart successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;