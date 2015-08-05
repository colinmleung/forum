/*var Sequelize = require('sequelize');
var sequelize = new Sequelize('mylocaldb', 'postgresql', '1qaz2wsx3edc', {
    host: 'localhost',
    dialect: 'postgres'
});

var bcrypt = require('bcrypt-node');


var User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(254),
        isEmail: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(40),
        allowNull: false
    }
});

User.sync({force: true}).then(function() {
    return User.create({
        username: 'testUsername',
        email: 'test@email.com',
        password: 'testpassword'
    });
});

var UserMethods = {
    generateHash: function(password) {
        return bcrypt.hashSync(password, genSaltSync(8), null);
    },
    validPassword: function(password) {
        return bcrypt.compareSync(password, this.local.password);
    }
}*/






var Sequelize = require('sequelize');
var sequelize = new Sequelize('mylocaldb', 'postgres', '1qaz2wsx3edc', {
    host: 'localhost',
    dialect: 'postgres'
});

var User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

User.sync();

module.exports = User;