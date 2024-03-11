// server.js
const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router.js');
const app = express();

app.use('/api', productsRouter);
app.use('/api/carts/', cartsRouter);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
