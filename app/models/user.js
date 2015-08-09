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
            }
        }
    });
    User.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
    User.sync();

    return User;
}