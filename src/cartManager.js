const fs = require('fs').promises; // Use promises for cleaner async/await handling

class CartManager {
    constructor(inputPath) {
        this.carts = [];
        this.path = inputPath;
    }

    async getCarts() {
        return this.carts;
    }


    async getCartProducts(cartId) {
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        return cart.products;
    }


    async getCartProducts(cartId) {
        const cart = this.carts.find(cart => cart.id === cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }
        return cart.products;
    }


    async loadCartsFromFile() {
        try {
            const fileContents = await fs.promises.readFile(this.path);
            this.carts = JSON.parse(fileContents);
            console.log("Carts loaded from file successfully");
        } catch (error) {
            console.error("Error reading file:", error);
            throw error;
        }
    }

    async addCart() {
        try {
            const newCart = {
                id: this.generateUniqueId(),
                products: [],
            };
            this.carts.push(newCart);
            await this.saveCartsToFile();
            return newCart;
        } catch (error) {
            console.error("Error adding cart:", error);
            throw error; // Re-throw for proper error handling
        }
    }

    generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }

    async saveCartsToFile() {
        try {
            const fileContents = JSON.stringify(this.carts, null, '\t');
            await fs.writeFile(this.path, fileContents);
            console.log("Carts saved to file successfully");
        } catch (error) {
            console.error("Error writing carts to file:", error);
            throw error; // Re-throw for proper error handling
        }
    }
}

module.exports = CartManager;