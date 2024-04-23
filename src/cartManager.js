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
        // Devolver solo el ID y los productos del nuevo carrito
        return {
            _id: newCart._id,
            products: newCart.products
        };
    }



    async addProductToCart(cartId, productId, quantity) {
        let cart = await Cart.findById(cartId);

        // Si el carrito no existe, crear uno nuevo
        if (!cart) {
            cart = await this.addCart();
        }

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(product => product.product.toString() === productId);

        if (existingProduct) {
            existingProduct.quantity += quantity; // Incrementar la cantidad si el producto ya está en el carrito
        } else {
            cart.products.push({ product: productId, quantity }); // Agregar el producto al carrito si no está presente
        }

        await cart.save();
    }
}

module.exports = CartManager;
