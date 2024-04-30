const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router.js');
const app = express();
const handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// Configurar Passport
require('./config/passport.config')(passport);

// Rutas de autenticación
const authRoutes = require('./routes/auth.router');

const DbProductManager = require('./productManager');
const CartManager = require('./cartManager');

app.use((req, res, next) => {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Middleware para analizar solicitudes codificadas en URL

// Configurar sesión con MongoStore
const mongoStoreOptions = {
    mongoUrl: 'mongodb+srv://lfver91:Rockmon123@coder-ecommerce.2lyxyye.mongodb.net/?retryWrites=true&w=majority',
    dbName: 'Coder-Ecommerce',
    ttl: 60 * 60 * 24 // tiempo de vida de la sesión en segundos (1 día)
};

const storage = MongoStore.create(mongoStoreOptions);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    store: storage // Utiliza MongoStore como almacenamiento de sesiones
}));

app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

// Rutas
app.use('/', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/auth', authRoutes);

const cartManager = new CartManager();
app.set('cartManager', cartManager);

const main = async () => {
    await mongoose.connect(mongoStoreOptions.mongoUrl, {
        dbName: mongoStoreOptions.dbName
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
