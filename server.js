var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');
var Sequelize = require('sequelize');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var db = require('./config/database')(Sequelize);
var User = require('./app/models/user')(db, Sequelize);
var Thread = require('./app/models/thread')(db, Sequelize);
var Post = require('./app/models/post')(db, Sequelize, User, Thread);
require('./config/passport')(passport, User);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport, db, User, Thread, Post);

app.listen(port);