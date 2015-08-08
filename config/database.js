// config/database.js
module.exports = function(Sequelize) {
	var db = new Sequelize('forum', 'postgres', '1qaz2wsx3edc', {
		dialect: 'postgres',
		host: 'localhost'
	});
	return db;
};