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

    async getProducts({ limit = 10, page = 1, sort = 'asc' }) {
        const skip = (page - 1) * limit;

        const sortOptions = {};
        if (sort === 'asc') {
            sortOptions.price = 1;
        } else if (sort === 'desc') {
            sortOptions.price = -1;
        }

        const products = await ProductModel.find()
            .skip(skip)
            .limit(Number(limit))
            .sort(sortOptions);  // Aplicar el ordenamiento aquí

        return products.map(product => product.toObject({ virtuals: true }));
    }


    async getProductById(id) {
        const product = await ProductModel.findById(id).lean();
        return product;
    }

    async getProductByTitle(title) {
        const product = await ProductModel.findOne({ title }).lean();
        return product;
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


