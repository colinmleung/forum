module.exports = function(db, Sequelize) {

	var Thread = db.define('thread', {
		title: Sequelize.STRING,
	});
	Thread.sync();

	return Thread;
}