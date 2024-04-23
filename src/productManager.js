const ProductModel = require('./models/products.model');

class ProductManager {


    async prepare() {

        if (ProductModel.db.readyState !== 1) {
            throw new Error('must connect to mongodb!')
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        const product = new ProductModel({
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

    async getProducts(filters = {}) {
        const { title = null, code = null } = filters; // Aquí defines los filtros que quieres aplicar

        const queryConditions = [];

        if (title) {
            queryConditions.push({
                title: {
                    $regex: `^${title}`,
                    $options: 'i'
                }
            });
        }

        if (code) {
            queryConditions.push({
                code: {
                    $regex: `^${code}`,
                    $options: 'i'
                }
            });
        }

        const products = queryConditions.length
            ? await ProductModel.find({ $and: queryConditions }) // Aplicar filtros si existen
            : await ProductModel.find(); // Obtener todos los productos si no hay filtros

        return products.map(product => product.toObject({ virtuals: true })); // Convertir a objetos de JavaScript
    }


    // async getProducts() {
    //     const products = await ProductModel.find();
    //     return products.map(product => product.toObject());
    // }


    async getProductById(id) {
        return await ProductModel.findById(id);
    }

    async updateProduct(id, updatedFields) {
        const product = await ProductModel.findById(id);
        if (!product) {
            throw new Error("Product not found");
        }
        Object.assign(product, updatedFields);
        await product.save();
        return product;
    }

    async deleteProduct(id) {
        const product = await ProductModel.findByIdAndDelete(id); // Usar findByIdAndDelete
        if (!product) {
            throw new Error("Product not found");
        }
        return product; // Retornar el producto eliminado
    }
}

module.exports = ProductManager;


