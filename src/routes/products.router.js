// products.router.js
const express = require("express");
const ProductManager = require("../productManager");
const router = express.Router();

// const productManager = new ProductManager('../../products.json');
const productManager = new ProductManager('../products.json');

router.use(express.json()); // Middleware para analizar el cuerpo de la solicitud en formato JSON

router.get("/", async (req, res) => {
    try {
        // Leer productos del archivo JSON
        await productManager.readProducts();
        const products = productManager.getProducts();

        res.send(products); // Enviar la lista completa de productos como respuesta
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/:pid", async (req, res) => {
    try {
        await productManager.readProducts();
        const productId = +req.params.pid;
        const productById = await productManager.getProductById(productId);

        if (!productById) {
            return res.status(404).send("Product not found");
        }

        res.send(productById);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        const newProduct = await productManager.addProduct(title, description, price, thumbnail, code, stock);

        // Leer todos los productos después de agregar el nuevo
        await productManager.readProducts();
        const products = productManager.getProducts();

        // Enviar la lista completa de productos como respuesta
        res.status(201).send(products);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send("Bad Request");
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = +req.params.pid;
        const updatedFields = req.body;

        // Actualizar el producto con el ID especificado
        await productManager.updateProduct(productId, updatedFields);

        // Leer todos los productos después de actualizar
        await productManager.readProducts();
        const products = productManager.getProducts();

        // Enviar la lista completa de productos como respuesta
        res.send(products);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const productId = +req.params.pid;

        // Eliminar el producto con el ID especificado
        await productManager.deleteProduct(productId);

        // Leer todos los productos después de eliminar
        await productManager.readProducts();
        const products = productManager.getProducts();

        // Enviar la lista completa de productos como respuesta
        res.send(products);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;