module.exports = function(app, auth) {

    app.get('/', function(req, res) {
        res.render('index', { user: req.user });
    });

    app.get('/login', function(req, res) {
        res.render('login', { message: req.flash('loginMessage') });
    });

    app.post('/login', function(req, res) {
        auth.login();
    });

    app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });

    app.post('/signup', function(req, res) {
        User.signup(new User { username: , password: });
    });

    /*app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user
        });
    });*/

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
}




/*



app.get('/', function(request, response) {
    response.render('index');
});

app.get('/db', function(request, response) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
            done();
            if (err) {
                console.error(err);
                response.send("Error " + err);
            } else {
                response.render('db', { results: result.rows });
            }
        });
    });
    res.render('index');
});

*/