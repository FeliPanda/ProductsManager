// server.js
const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router.js');
const app = express();
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

const DbProductManager = require('./productManager');
const CartManager = require('./cartManager');

//quitar favicon
app.use((req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

// rutas
app.use('/', productsRouter);
app.use('/api/carts', cartsRouter); // <-- Cambio aquí

// Instanciar y configurar CartManager
const cartManager = new CartManager();
app.set('cartManager', cartManager);

const main = async () => {

    // conectando a mongoDB
    await mongoose.connect('mongodb+srv://lfver91:Rockmon123@coder-ecommerce.2lyxyye.mongodb.net/?retryWrites=true&w=majority', {
        dbName: 'Coder-Ecommerce'
    })

    const productManager = new DbProductManager()
    await productManager.prepare()
    app.set('productManager', productManager)


    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

main()
