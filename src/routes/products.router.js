// const express = require("express");
//const ProductManager = require("../productManager");
// const router = express.Router();
// const mongoose = require('mongoose');
const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose');



router.get("/", async (req, res) => {
    try {
        const productManager = req.app.get('productManager')
        const product = await productManager.getProducts(req.query)
        console.log("productos de la BD", product)
        res.status(200).json(product)
    } catch (error) {
        console.error("Error:", error);
        return res.status(400).json({ success: false })

    }
});

router.get("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;

        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send("Invalid Product ID");
        }

        const productManager = req.app.get('productManager');
        const product = await productManager.getProductById(productId); // Obtener el producto por ID

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.send(product.toObject({ virtuals: true })); // Convertir a objeto de JavaScript
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/", async (req, res) => {
    try {
        const productManager = req.app.get('productManager'); // Obtener productManager

        const { title, description, price, thumbnail, code, stock } = req.body;
        const newProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock);

        res.status(201).send(newProduct);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send("Bad Request");
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productManager = req.app.get('productManager'); // Obtener productManager

        const productId = req.params.pid;
        const updatedFields = req.body;

        await productManager.updateProduct(productId, updatedFields);

        res.status(200).send("Product updated successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productManager = req.app.get('productManager'); // Obtener productManager

        const productId = req.params.pid;

        await productManager.deleteProduct(productId);

        res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
