const Cart = require('./models/carts.model.js');

class CartManager {


    async getCarts() {
        return await Cart.find();
    }

    async addCart() {
        const newCart = new Cart({
            products: []
        });
        await newCart.save();
        return newCart;
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.products.push({ product: productId, quantity });
        await cart.save();
    }
}

module.exports = CartManager;
