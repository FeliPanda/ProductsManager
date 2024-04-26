const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async function (email, password, done) {
            // Aquí tu lógica para autenticar al usuario
            if (email === 'soyunpanda@pandas.com' && password === 'panditas123') {
                return done(null, { id: 1, email: 'soyunpanda@pandas.com', role: 'admin' });
            } else {
                return done(null, false, { message: 'Incorrect email or password' });
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // Aquí tu lógica para buscar al usuario por ID y devolverlo
        done(null, { id: 1, email: 'soyunpanda@pandas.com', role: 'admin' });
    });
};
