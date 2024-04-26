const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router.js');
const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' }); // Importar y configurar handlebars
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

// Configurar Passport
require('./config/passport.config')(passport);

// Rutas de autenticación
const authRoutes = require('./routes/auth.router');

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

// Middleware para la autenticación con Passport
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// Rutas
app.use('/', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/auth', authRoutes);

// Instanciar y configurar CartManager
const cartManager = new CartManager();
app.set('cartManager', cartManager);

const main = async () => {
    // Conectando a mongoDB
    await mongoose.connect('mongodb+srv://lfver91:Rockmon123@coder-ecommerce.2lyxyye.mongodb.net/?retryWrites=true&w=majority', {
        dbName: 'Coder-Ecommerce'
    });

    const productManager = new DbProductManager();
    await productManager.prepare();
    app.set('productManager', productManager);

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

main();
