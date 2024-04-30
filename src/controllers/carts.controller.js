const CartManager = require('../cartManager');
const Product = require('../models/products.model');

const cartManager = new CartManager();

exports.getCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCart(cartId).populate('products.product');

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const transformedProducts = await Promise.all(cart.products.map(async item => {
            const product = await productManager.getProductById(item.product._id);
            return {
                title: product.title,
                description: product.description,
                price: product.price,
                quantity: item.quantity
            };
        }));

        res.render('cart', { products: transformedProducts });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};


exports.updateCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const products = req.body.products;

        await cartManager.updateCart(cartId, products);

        res.status(200).send("Cart updated successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.updateProductQuantity = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const quantity = req.body.quantity;

        await cartManager.updateProductQuantity(cartId, productId, quantity);

        res.status(200).send("Product quantity updated successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.removeProductFromCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId = req.params.pid;

        await cartManager.removeProductFromCart(cartId, productId);

        res.status(200).send("Product removed from cart successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.clearCart = async (req, res) => {
    try {
        const cartId = req.params.cid;

        await cartManager.clearCart(cartId);

        res.status(200).send("Cart cleared successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { cartId } = req.params;
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await cartManager.addToCart(cartId, productId, quantity);

        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.getSpecificCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCart(cartId);

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const transformedProducts = cart.products.map(item => ({
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity
        }));

        res.render('cart', { products: transformedProducts });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
};




