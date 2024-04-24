const Cart = require('./models/carts.model.js');

class CartManager {

    async getCarts() {
        return await Cart.find();
    }

    async getCart(cartId) {
        return await Cart.findById(cartId).populate('products.product');
    }

    async addCart() {
        const newCart = new Cart({
            products: []
        });
        await newCart.save();
        return {
            _id: newCart._id,
            products: newCart.products
        };
    }

    async updateCart(cartId, products) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.products = products;
        await cart.save();
    }

    async updateProductQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = cart.products.find(p => p.product.toString() === productId);
        if (product) {
            product.quantity = quantity;
            await cart.save();
        }
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
    }

    async clearCart(cartId) {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new Error("Cart not found");
        }

        cart.products = [];
        await cart.save();
    }

    async addToCart(cartId, productId, quantity) {
        let cart = await Cart.findById(cartId).populate('products.product'); // Asegúrate de usar populate para resolver la relación

        if (!cart) {
            cart = await this.addCart();
        }

        const existingProduct = cart.products.find(product => product.product._id.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        return cart;
    }
}

module.exports = CartManager;
