
const fs = require('fs');

class ProductManager {
    constructor(inputPath) {
        this.products = [];
        this.nextId = 1;
        this.path = inputPath;
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.error("Error: Missing Data");
        }

        // Verificar si el código ya existe en algún producto
        if (this.products.some((product) => product.code === code)) {
            return console.error("Error: Product CODE already exists");
        }

        let id = 1; // Inicializar el ID en 1
        // Encontrar el máximo ID actual y sumarle 1 para obtener un nuevo ID único
        if (this.products.length > 0) {
            id = Math.max(...this.products.map(product => product.id)) + 1;
        }

        const product = { id, title, description, price, thumbnail, code, stock };

        this.products.push(product);

        try {
            await this.saveProductsToFile();
            console.log("Product added successfully");
        } catch (error) {
            console.error("Error adding product:", error);
        }
        return product;
    }


    async readProducts() {
        try {
            const fileContents = await fs.promises.readFile(this.path);
            this.products = JSON.parse(fileContents);
            console.log("Products loaded from file successfully");
            return this.products;
        } catch (error) {
            console.error("Error reading file:", error);
            throw error;
        }
    }

    async saveProductsToFile() {
        try {
            const fileContents = JSON.stringify(this.products, null, '\t');
            await fs.promises.writeFile(this.path, fileContents);
            console.log("Products saved to file successfully");
        } catch (error) {
            console.error("Error writing products to file:", error);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error("Product not found");
        }
        this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
        try {
            await this.saveProductsToFile();
            console.log("Product updated successfully");
        } catch (error) {
            console.error("Error updating product:", error);
        }
    }

    async deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new Error("Product not found");
        }

        this.products.splice(productIndex, 1); // remover el producto del array

        console.log("Product deleted successfully");
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        return product;
    }
}

(async () => {
    const productManager = new ProductManager('../products.json');

    try {
        await productManager.readProducts();
    } catch (error) {
        console.error("Error loading products from file:", error);
    }

    // Prueba 2: addProduct agrega un nuevo producto y lo muestra correctamente
    await productManager.addProduct("producto prueba1", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    await productManager.addProduct("producto prueba2", "Este es un producto prueba2", 500, "Sin imagen", "zan765", 30);
    await productManager.addProduct("producto prueba3", "Este es un producto prueba3", 800, "Sin imagen", "hfg765", 40);
    await productManager.addProduct("producto prueba4", "Este es un producto prueba4", 600, "Sin imagen", "dafg345", 45);
    await productManager.addProduct("producto prueba5", "Este es un producto prueba5", 700, "Sin imagen", "mnb897", 85);


    console.log(productManager.getProducts()); // Debería mostrar el nuevo producto agregado

})();

module.exports = ProductManager;
