const CartManager = require('../cartManager');
const cartManager = new CartManager();

exports.getCart = async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartManager.getCart(cartId).populate('products.product'); // Aquí usamos populate para resolver la relación

        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const transformedProducts = cart.products.map(item => ({
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity
        }));

        res.render('cart', { products: transformedProducts });  // Renderizar la vista 'cart' con los productos del carrito
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
        const cartId = req.params.cid;
        const { productId, quantity } = req.body;

        console.log("addToCart endpoint called"); // Comprobar si el endpoint se llama correctamente

        const updatedCart = await cartManager.addToCart(cartId, productId, quantity);

        console.log("Updated cart:", updatedCart); // Comprobar si el carrito se actualiza correctamente

        if (updatedCart) {
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ message: "Cart not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


