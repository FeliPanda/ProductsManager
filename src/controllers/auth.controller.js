const passport = require('passport');
const userManager = require('../userManager');

exports.getLogin = (req, res) => {
    res.render('login'); // Renderiza la vista de login
};

exports.postLogin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/products', // Redirige a la vista de productos si el login es exitoso
        failureRedirect: '/auth/login', // Redirige de nuevo al login si hay un error
    })(req, res, next);
};

exports.getRegister = (req, res) => {
    res.render('register'); // Renderiza la vista de registro
};

exports.postRegister = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        // Crear un nuevo usuario utilizando el UserManager
        const newUser = await userManager.createUser(email, password);
        res.redirect('/auth/login'); // Redirigir al usuario al login después de registrarse
    } catch (error) {
        // Manejar el error (por ejemplo, si el correo electrónico ya está en uso)
        console.error(error);
        res.status(500).send('Error registering user');
    }
};

exports.logout = (req, res) => {
    req.logout();               // Método de Passport para logout
    res.redirect('/auth/login'); // Redirige al login después del logout
};
