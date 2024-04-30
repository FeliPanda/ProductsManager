// controllers/products.controller.js
const ProductManager = require('../productManager');
const productManager = new ProductManager();

exports.getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const products = await productManager.getProducts({ limit, page });

        if (!products.length) {
            return res.status(204).send("No products found");
        }

        res.render('productList', { products });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;  // Cambiado de req.params.pid a req.params.id
        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render('productDetail', { product });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getProductByTitle = async (req, res) => {
    try {
        const title = req.query.query; // Get the title from the query string
        const product = await productManager.getProductByTitle(title);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render('productDetail', { product });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.addToCartFromProductList = async (req, res) => {
    try {
        const cartId = req.app.get('cartManager').getCartId(); // Assuming you have a way to get the cart ID
        const { productId, quantity } = req.body;

        const cart = await cartManager.addToCart(cartId, productId, quantity);

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
