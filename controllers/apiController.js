const bodyParser = require('body-parser');
const Contact = require('../models/contactModel');

module.exports = function (app) {
	//====MIDDLEWARE
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

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
			if(err) return console.error(err);
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
		
		// res.render('response', { path: req.path, method: req.method, body: JSON.stringify(req.body) });
		// res.send();
	});

	app.post('/contact2', (req, res, next) => {
		//post new contact to database
		console.log('in contact2', req.body);
		res.render('response', { path: req.path, method: req.method, body: JSON.stringify(req.body) });
		// res.send();
	});


	//====PUT
	app.put('/contact/:id', (req, res, next) => {
		//change a contact by its id
		res.send();
	});

	//====DELETE
	app.delete('/contact/:id', (req, res, next) => {
		//delete a contact by its id
		res.send();
	});
}

function logPath(req) {
	console.log(`called ${req.path}`);
}

// function getPath(req) {
// 	// return `${req.method} ${req.path}`;
// }
// export default function (app) {
// }