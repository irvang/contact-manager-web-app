let Todos = require('../models/todoModel');
const todoClass = require('../models/todoClass');
// console.log(Todos);

module.exports = function (app) {

	app.get('/api/setupTodos', (req, res, next) => {

		const starterTodos = [
			{
				username: 'test',
				todo: 'Buy milk',
				isDone: false,
				hasAttachment: false
			},
			{
				username: 'test',
				todo: 'Feed dog',
				isDone: false,
				hasAttachment: false
			},
			{
				username: 'test',
				todo: 'Learn node',
				isDone: false,
				hasAttachment: false
			}, 
			new todoClass('test', 'buy nothing', false, false), 
			new todoClass('test', 'buy incencse', false, false)
		]; 

		//available because of require()
		/* Model.create(): Shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.
  		This function triggers the following middleware.
		save()
 		*/
		Todos.create(starterTodos, (err, results) => {
			res.send(results);
		});
	});
}
