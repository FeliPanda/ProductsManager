const Cart = require('./models/carts.model.js');
const { ObjectId } = require('mongoose').Types;

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

        // Elimina el _id para evitar el error de clave duplicada
        delete newCart._id;

        await newCart.save();
        return newCart;
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
        let cart = await Cart.findById(cartId).populate('products.product');

        if (!cart) {
            const newCart = await this.addCart();
            cart = newCart;
        }

        const existingProductIndex = cart.products.findIndex(product => product.product._id.toString() === productId);

        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        // Devuelve solo el producto y la cantidad que se agregó
        const updatedProduct = cart.products.find(product => product.product._id.toString() === productId);
        return updatedProduct;
    }
}

module.exports = CartManager;
