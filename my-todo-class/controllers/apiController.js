const Todos = require('../models/todoModel');
const todoClass = require('../models/todoClass');
const bodyParser = require('body-parser');

// console.log('todoclass: ',todoClass.toString);

module.exports = function (app) {
	//make some endpoints

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.get('/api/todos/:uname', (req, res, next) => {
		//will find all the items that match that username
		//has an error first callback
		Todos.find({ username: req.params.uname }, (err, todos) => {
			if (err) throw err;

			res.send(todos);
		});
	});

	app.get('/api/todo/:id', (req, res, next) => {
		Todos.findById({ _id: req.params.id }, (err, todo) => {
			if (err) throw err;

			res.send(todo);
		});
	});

	app.post('/api/todo', (req, res) => {
		//if there is an id, it means it is an update, if not, it is then a new item
		console.log(req.body);

		if (req.body.id) {
			Todos.findByIdAndUpdate(req.body.id, {
				todo: req.body.todo,
				isDone: req.body.isDone,
				hasAttachment: req.body.hasAttachment
			},
				(err, todo) => {
					if (err) throw err;
					res.send('Success - updated');
				}
			)

		} else {
			let newTodo = Todos({
				username: 'test',
				todo: req.body.todo,
				isDone: req.body.isDone,
				hasAttachment: req.body.hasAttachment
			});
			newTodo.save((err) => {
				if (err) throw err;
				res.send('success - new created');
			})
		}
	});

	app.delete('/api/todo', (req, res, next) => {
		if(req.body.id) {
			Todos.findByIdAndRemove(req.body.id, function (err) {
				if (err) throw err;
				res.send('Success - deleted');
			});
		}else {
			res.status(404).send('no id found');
		}

	});
}