const passport = require('passport');
const User = require('../models/user.model');
const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

exports.getLogin = (req, res) => {
    res.render('login'); // Renderiza la vista de login
};

exports.postLogin = passport.authenticate('local', {
    successRedirect: '/products', // Redirige a la vista de productos si el login es exitoso
    failureRedirect: '/auth/login', // Redirige de nuevo al login si hay un error
});

exports.getRegister = (req, res) => {
    res.render('register'); // Renderiza la vista de registro
};

exports.postRegister = async (req, res) => {
    try {
        // Verificar si el correo electrónico se está recibiendo correctamente en el servidor
        console.log(req.body.email);

        // Validar los datos del usuario con Joi
        const { error, value } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            return res.status(400).send('Email already exists!');
        }

        // Crear un nuevo usuario
        const newUser = await User.create({ email: value.email, password: value.password });
        res.redirect('/auth/login'); // Redirigir al usuario al login después de registrarse
    } catch (error) {
        // Manejar el error
        console.error(error);
        res.status(500).send('Error registering user');
    }
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/auth/login');
};