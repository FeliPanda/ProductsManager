const express = require("express");
const CartManager = require("../cartManager");
const router = express.Router();

const cartManager = new CartManager('../carts.json');

router.get('/', async (req, res) => {
    try {
        // Cargar los carritos desde el archivo
        await cartManager.loadCartsFromFile();

        const carts = await cartManager.getCarts(); // Obtener los carritos

        if (!carts.length) {
            // Si no hay carritos, responder con un estado 204 (No Content)
            return res.status(204).send("No carts found");
        }

        // Responder con los carritos obtenidos
        res.json(carts);
    } catch (error) {
        // Manejar errores
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});




// Add product to a cart
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity || 1; // Default quantity is 1

        await cartManager.loadCartsFromFile(); // Load carts before accessing them

        let cart = cartManager.carts.find(cart => cart.id === cartId);
        if (cart) {
            return res.status(400).send("Cart already exists");
        }

        // If cart does not exist, create a new one
        cart = await cartManager.addCart();

        // Add the product to the cart
        cart.products.push({ product: productId, quantity });

        await cartManager.saveCartsToFile();
        res.status(201).send("Product added to cart successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;