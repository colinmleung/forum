var express = require('express');
var app = express();

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//var User = require('./models/user');
var Sequelize = require('sequelize');
var PassportLocalSequelize = require('passport-local-sequelize');
var sequelize = new Sequelize('mylocaldb', 'postgres', '1qaz2wsx3edc', {
    host: 'localhost',
    dialect: 'postgres'
});
    sequelize.authenticate()
        .then(function () {
            // Synchronize the db
            sequelize.sync({ force: true })
              .then(function() {
              })
        });

/*var User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

User.sync();*/

var User = PassportLocalSequelize.defineUser(sequelize, {});

//var Authentication = require('./models/authentication')(passport, User);
    /*var PassportLocalStrategy = require('passport-local').Strategy;
    passport.use(new PassportLocalStrategy(
        function(username, password, done) {
            console.log('USERNAME' + username);
            User.findOne({username: username}).success(function(user) {
                console.log("INSIDE!!!" + user);
                if (!user) {
                    return done(null, false, { message: 'Username not found.' });
                }
                if (user.password !== password) {
                    return done(null, false, { message: 'Wrong password.' });
                }
                return done(null, { username: user.username });
            }).error(function(err) {
                console.log("INSIDE ERROR");
                done(err);
            });
        }
    ));



    passport.validPassword = function(password) {
        return this.password === password;
    };

    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        User.findOne({username: username}).success(function(user) {
            done(null, user);
        });
    });*/

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//require('./routes')(app, Authentication);
    app.get('/', function(req, res) {
        res.render('index', { user: req.user });
    });

    app.get('/login', function(req, res) {
        res.render('login');
    });

    app.post('/login', function(req, res) {
        console.log("authenticating");
        console.log("req.body.username " + req.body.username);
        User.authenticate(req.body.username, req.body.password, function(err) {
            console.log(err);
        });
    });

    app.get('/signup', function(req, res) {
        res.render('signup');
    });

    app.post('/signup', function(req, res) {
        User.register(req.body.username, req.body.password, function(err) {
            console.log(err);
            res.render('index');
        });
    });

app.listen(app.get('port'), function() {
    console.log('running');
});