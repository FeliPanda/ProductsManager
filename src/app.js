// server.js
const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router.js');
const app = express();
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

// conectando a mongoDB

mongoose.connect('mongodb+srv://lfver91:Rockmon123@coder-ecommerce.2lyxyye.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



//configurar handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', handlebars)

// rutas
app.use('/api', productsRouter);
app.use('/api/carts/', cartsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
