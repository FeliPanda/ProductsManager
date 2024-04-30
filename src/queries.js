const mongoose = require('mongoose');
const Product = require('./models/products.model');

class Queries {
    async getProducts({ limit = 10, page = 1, sort, query }) {
        const match = {};
        const sortOptions = {};

        // Filtrar por query
        if (query) {
            match.title = { $regex: new RegExp(query, 'i') };
        }

        // Ordenar
        if (sort) {
            if (sort === 'asc') {
                sortOptions.price = 1;
            } else if (sort === 'desc') {
                sortOptions.price = -1;
            }
        }

        const skip = (page - 1) * limit;

        const aggregationPipeline = [
            { $match: match },
            ...(Object.keys(sortOptions).length ? [{ $sort: sortOptions }] : []), // Aplicar $sort solo si sortOptions no está vacío
            { $skip: skip },
            { $limit: limit }
        ];

        const products = await Product.aggregate(aggregationPipeline);

        const totalProducts = await Product.countDocuments(match);
        const totalPages = Math.ceil(totalProducts / limit);

        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        const prevPage = hasPrevPage ? page - 1 : null;
        const nextPage = hasNextPage ? page + 1 : null;

        const prevLink = hasPrevPage ? `http://localhost:8080/?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null;
        const nextLink = hasNextPage ? `http://localhost:8080/?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null;

        return {
            status: "success",
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink,
            nextLink
        };
    }
}

module.exports = { Queries };
