/*var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

    });

    passport.user('local-signup'), new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done) {

    });
};*/


var PassportLocalStrategy = require('passport-local').Strategy;

module.exports = function (passport, User) {
    passport.use(new PassportLocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        function(username, password, done) {
            User.find({username: username}).success(function(user) {
                if (!user) {
                    return done(null, false, { message: 'Username not found.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Wrong password.' });
                }
                return done(null, { username: user.username });
            }).err(function(err) {
                done(err);
            });
        }
    }));



    passport.validPassword = function(password) {
        return this.password === password;
    };

    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        User.find({username: username}).success(function(user) {
            done(null, user);
        });
    });

    /*var AuthController = {
        login: passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/'
        }),
        loginSuccess: function(req, res) {
            res.json({
                success: true,
                user: req.session.passport.user
            });
        },
        loginFailure: function(req, res) {
            res.json({
                success: failure,
                message: 'Invalid username or password'
            });
        },
        logout: function(req, res) {
            req.logout();
            res.end();
        }
    };*/
};

