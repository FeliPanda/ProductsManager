const Product = require('./models/products.model.js');

class ProductManager {

    async addProduct(title, description, price, thumbnail, code, stock) {
        const product = new Product({
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });
        await product.save();
        return product;
    }

    async getProducts() {
        return await Product.find();
    }

    async getProductById(id) {
        return await Product.findById(id);
    }

    async updateProduct(id, updatedFields) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        Object.assign(product, updatedFields);
        await product.save();
    }

    async deleteProduct(id) {
        await Product.findByIdAndDelete(id);
    }
}

module.exports = ProductManager;
