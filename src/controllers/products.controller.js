// controllers/products.controller.js
const ProductManager = require('../productManager');
const productManager = new ProductManager();

exports.getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const products = await productManager.getProducts({ limit, page });
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

exports.addToCartFromProductList = async (req, res) => {
    try {
        const cartManager = req.app.get('cartManager');
        const cartId = "OBTENER_CART_ID_AQUI"; // Deberías obtener el cartId de la sesión o cookies
        const { productId, quantity } = req.body;

        const cart = await cartManager.addToCart(cartId, productId, quantity);

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
