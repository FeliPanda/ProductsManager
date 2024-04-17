const express = require("express");
const ProductManager = require("../productManager");
const router = express.Router();

const productManager = new ProductManager();

router.use(express.json());

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.send(product);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/", async (req, res) => {
    try {
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
        const productId = req.params.pid;

        await productManager.deleteProduct(productId);

        res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
