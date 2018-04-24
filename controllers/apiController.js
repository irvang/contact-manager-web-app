const bodyParser = require('body-parser');
const Contact = require('../models/contactModel');

module.exports = function (app) {
	//====MIDDLEWARE
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	app.use('/', (req, res, next) => {
		// console.log(`apiController: app.use || METHOD: ${req.method} | PATH: ${req.path} | BODY: `, req.body, '|');
		next();
	});

	//====HTTP METHODS 
	//====GET
	app.get('/landing', (req, res, next) => {
		//get all contacts

		res.render('index', { path: req.path });
		// res.send(getPath(req));
	});

	app.get('/contacts', (req, res, next) => {
		//get all contacts

		Contact.model.find(function (err, contacts) {
			if (err) return console.error(err);
			res.send(contacts);
		});

		// res.render('response', { path: req.path, method: req.method, body: JSON.stringify(req.body) });
	}); 

	app.get('/contact/:name', (req, res, next) => {
		//get contact by name

		res.send(res.body);
	});

	//====POST
	app.post('/contact', (req, res, next) => {
		//post new contact to database

		let newContact = new Contact.creator(req.body.name, req.body.lastname, req.body.phoneNumber);

		newContact.save((err) => {
			if (err) throw err;
			res.send('success! - contact added in post:');
		})
		console.log("body: ", req.body);
	});

	app.post('/contact2', (req, res, next) => {
		//post new contact to database

		let newContact = new Contact.creator(req.body.fname, req.body.lname, req.body.phone);

		newContact.save((err) => {
			if (err) throw err;
			res.send(`success! - contact added with post: 
			\n\n${newContact.fname} ${newContact.lname} ${newContact.phone}`);
		})
		console.log("at /contact2 -- body: ", req.body);
	});

	//====PUT
	app.put('/contact/:id', (req, res, next) => {
		//change a contact by its id

		if (req.params.id) {
			console.log('got inside');
			Contact.model.findByIdAndUpdate(req.params.id, {
				//schema
				fname: req.body.name,
				lname: req.body.lastname,
				phone: req.body.phoneNumber

				//callback
			}, (err, todo) => {
				if (err) throw err;
				res.send('Success! Contact updated');
			}
			);
		} else {
			res.send('Sorry, unable to find contact');
		}

	});

	//====DELETE
	app.delete('/contact/:id', (req, res, next) => {
		//delete a contact by its 
		if (req.body.id) {
			let q = Contact.model.findByIdAndRemove(req.body.id, function (err) {
				if (err) throw err;
				res.send('Contact deleted successfully!');
			});
			console.log(q.schema.obj);
		} else {
			res.status(404).send();
		}
	});
}

function logPath(req) {
	console.log(`called ${req.path}`);
}