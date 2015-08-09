// config/database.js
module.exports = function(Sequelize) {
	var db;
	if (process.env.DATABASE_URL) {
		db = new Sequelize(process.env.DATABASE_URL);
	} else {
		db = new Sequelize('forum', 'postgres', '1qaz2wsx3edc', {
			dialect: 'postgres',
			host: 'localhost'
		});
	}
	
	return db;
};