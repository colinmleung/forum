var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport, User) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User
            .findById(id)
            .then(function(user) {
                done(null, user);
            })
            .catch(function(err) {
                done(err);
            });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User
            .findOne({where: {email : email}})
            .then(function(user) {
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    User
                        .build({
                            email: email,
                            password: User.generateHash(password)
                        })
                        .save()
                        .then(function(user) {
                            return done(null, user);
                        })
                        .catch(function(err) {
                            done(err);
                        });
                }
            })
            .catch(function(err) {
                done(err);
            });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User
            .findOne({where: {'email' : email}})
            .then(function(user) {
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                return done(null, user);
            })
            .catch(function(err) {
                return done(err);
            });
    }));

};