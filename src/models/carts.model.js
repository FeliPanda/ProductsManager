const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }]
});

// Añadir método virtual para transformar el objeto a JSON
cartSchema.virtual('toJSON').get(function () {
    return {
        _id: this._id,
        products: this.products.map(product => ({
            product: product.product,
            quantity: product.quantity
        }))
    };
});

module.exports = mongoose.model('Cart', cartSchema);
