// app/routes.js
module.exports = function(app, passport, db, User, Thread, Post) {

    // MAIN - ALL THREADS

    app.get('/', function(req, res) {
        Thread
            .findAll({limit: 10})
            .then(function(threads) {
                res.render('index.ejs', { threads: threads, isLoggedIn: req.isAuthenticated() });
            })
            .catch(function(err) {
                res.render('500.ejs', { error: err });
            });
    });

    app.post('/', isLoggedIn, function(req, res) {
        Thread
            .build({ title: req.body.title })
            .save()
            .then(function(thread) {
                Post
                    .build({ body: req.body.body })
                    .save()
                    .then(function(post) {
                        post.setUser(req.user).then(function(post) {
                            post.setThread(thread).then(function(post) {
                                res.redirect('thread/' + thread.id + '/1');
                            });
                        });
                    })
                    .catch(function(err) {
                        res.render('500.ejs', { error: err });
                    });
            })
            .catch(function(err) {
                res.render('500.ejs', { error: err });
            });
    });

    // THREAD

    app.get('/thread/:id/:page', function(req, res) {
        console.log('GOT HERE');
        Post
            .findAll({
                where: { 'threadId': req.params.id },
                order: '"updatedAt" DESC',
                limit: 10,
                offset: 10*(req.params.page-1),
                raw: true
            })
            .then(function(posts) {
                res.render('thread.ejs', {
                    id: req.params.id,
                    page: req.params.page,
                    posts: posts,
                    isLoggedIn: req.isAuthenticated()
                });
            })
            .catch(function(err) {
                res.render('500.ejs', { error: err });
            });
    });

    app.post('/thread', isLoggedIn, function(req, res) {
        Post
            .build({ body: req.body.body })
            .save()
            .then(function(post) {
                post.setUser(req.user)
                    .then(function(post) {
                        Thread.findById(req.body.id)
                            .then(function(thread) {
                                post.setThread(thread)
                                    .then(function() {
                                        res.redirect('thread/' + req.body.id + '/1');
                                    });
                            });
                    });
            })
            .catch(function(err) {
                res.render('500.ejs', { error: err });
            });
    })

    // LOGIN

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));

    // SIGNUP

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    // PROFILE

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    // LOGOOUT

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}