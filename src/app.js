const express = require('express');
const ProductManager = require('./productManager.js');

const app = express();

const productManager = new ProductManager('../products.json');

app.get('/products', async (req, res) => {
    try {
        await productManager.readProducts(); // Espera a cargar los productos desde el archivo JSON
        const { limit } = req.query; //este es el valor de la query limit podria ser = 1,2,3 dependiendo de la busqueda a realizar
        const products = productManager.getProducts(); //este nos invoca al metodo getProducts y nos trae todos los productos

        // filtramos si el valor es un numero y es mayor a cero
        if (limit && !isNaN(Number(limit)) && Number(limit) > 0) {
            res.send(products.slice(0, Number(limit))); // nos envia el nuevo array con el numero de limit que es la solicitud
            return;
        }

        else {
            res.send(products); // Si no se proporciona un límit, se envían todos los productos
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // si no cumple las condiciones nos envia todos los productos
    }
});

//buscar product por id con params

app.get('/products/:pid', async (req, res) => {
    try {
        await productManager.readProducts(); // Load products from file

        const productId = +req.params.pid;
        const productById = await productManager.getProductById(productId); // Search by ID

        if (!productById) {
            return res.status(404).send('Product not found');
        }

        res.send(productById); // Send the found product

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/products/:pid', async (req, res) => {
//     try {
//         await productManager.readProducts(); // Espera a cargar los productos desde el archivo JSON
//         const productId = req.params.pid // equivale al valor de la busqueda que toma el ID
//         const productById = await productManager.getProductById(productId) // traermos el producto filtrado por ID usando el metodo getproductbyid
//         res.send(productById)// enviamos el producto filtrado

//     } catch (error) {
//         console.error('Error:', error);
//         res.status(404).send('Product not found')
//     }
// })

//hacer que el servidor escuche las peticiones
app.listen(8080, () => {
    console.log('Server running on port 8080');
});
