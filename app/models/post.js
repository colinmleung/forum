module.exports = function(db, Sequelize, User, Thread) {

	var Post = db.define('post', {
		body: Sequelize.TEXT
	});

	Post.belongsTo(Thread);
	Post.belongsTo(User);

	Post.sync();

	return Post;
}