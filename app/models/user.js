var bcrypt = require('bcrypt-nodejs');

module.exports = function(db, Sequelize) {
// app/models/user.js
    var User = db.define('user', {
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING
    },
    {
        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
            generateHash: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
            }
        }
    });
    User.sync();

    return User;
}

/*
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
*/