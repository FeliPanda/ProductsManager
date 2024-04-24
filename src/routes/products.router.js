
// const { Router } = require('express')
// const { Queries } = require('../queries');
// const mongoose = require('mongoose');

// const router = Router()
// const queries = new Queries();

// router.get("/", async (req, res) => {
//     try {
//         const productManager = req.app.get('productManager');
//         const { limit = 10, page = 1 } = req.query;

//         const products = await productManager.getProducts({ limit, page });

//         if (!products.length) {
//             return res.status(204).send("No products found");
//         }

//         res.render('productList', { products });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });



// router.get("/:pid", async (req, res) => {
//     try {
//         const productId = req.params.pid;

//         if (!mongoose.Types.ObjectId.isValid(productId)) {
//             return res.status(400).send("Invalid Product ID");
//         }

//         const productManager = req.app.get('productManager');
//         const product = await productManager.getProductById(productId);

//         if (!product) {
//             return res.status(404).send("Product not found");
//         }

//         res.render('productDetail', { product });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// router.post("/", async (req, res) => {
//     try {
//         const productManager = req.app.get('productManager'); // Obtener productManager

//         const { title, description, price, thumbnail, code, stock } = req.body;
//         const newProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock);

//         res.status(201).send(newProduct);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(400).send("Bad Request");
//     }
// });

// router.put('/:pid', async (req, res) => {
//     try {
//         const productManager = req.app.get('productManager'); // Obtener productManager

//         const productId = req.params.pid;
//         const updatedFields = req.body;

//         await productManager.updateProduct(productId, updatedFields);

//         res.status(200).send("Product updated successfully");
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });

// router.delete('/:pid', async (req, res) => {
//     try {
//         const productManager = req.app.get('productManager'); // Obtener productManager

//         const productId = req.params.pid;

//         await productManager.deleteProduct(productId);

//         res.status(200).send("Product deleted successfully");
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// module.exports = router;




const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/:pid/add-to-cart', productsController.addToCartFromProductList);

module.exports = router;
