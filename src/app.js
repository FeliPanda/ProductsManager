// server.js
const express = require('express');
const productsRouter = require('./routes/products.router');

const app = express();

app.use('/api', productsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
