const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        { usernameField: 'email' },
        async function (email, password, done) {
            try {
                const user = await User.findOne({ email });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const isMatch = await user.comparePassword(password);

                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};