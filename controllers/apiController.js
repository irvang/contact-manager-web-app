const bodyParser = require('body-parser');
const Contact = require('../models/contactModel');
const path = require('path');

//Assigns methods to app
module.exports = function (app) {
	//====MIDDLEWARE
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//====LANDING page
	app.get('/landing', (req, res, next) => {
		res.render('index');
		// res.render('index'); 
		// res.sendFile(path.join(__dirname + '../public'));
	});

	//====GET - all contacts
	app.get('/contacts', (req, res, next) => {
		Contact.model.find(function (err, contacts) {
			if (err) return console.error(err);
			// console.log(contacts.length);//send lenght of list, for later
			res.send(contacts);
		});
	});

	//====POST - post new contact to database
	app.post('/contact', (req, res, next) => {
		//deconstruncting for cleaner code
		const { firstName, lastName, phoneNumber, email, birthday, notes } = req.body;

		//convert to array, then to mm-dd-yyyy format
		let bday = birthday.split('-');
		bday = `${bday[1]}-${bday[2]}-${bday[0]}`;

		const newContact = new Contact.creator(firstName, lastName, phoneNumber, email, bday, notes);

		newContact.save((err) => {
			if (err) throw err;
			// res.send('successsss');
			res.send(`Success! - contact added with post: 
			\n\n <strong>${firstName} ${lastName} ${phoneNumber} ${bday} </strong>`);
		});

		// console.log("at /contact -- body: ", req.body);
	});

	//====PUT - change a contact by its id
	app.put('/contact/:id', (req, res, next) => {

		if (req.params.id) {
			console.log('got inside');
			Contact.model.findByIdAndUpdate(req.params.id, {
				//schema
				firstName: req.body.name,
				lastName: req.body.lastname,
				phoneNumber: req.body.phoneNumber,
				email: req.body.email,
				birthday: req.body.birthday,
				notes: req.body.notes

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

	//====DELETE - delete a contact by its id?
	app.delete('/contact', (req, res, next) => {
		console.log('in DELETE', req.body);

		if (req.body.id) {
			let q = Contact.model.findByIdAndRemove(req.body.id, function (err) {
				if (err) throw err;
				res.send('Contact deleted successfully!');
			});
			// console.log(q.schema.obj);
		} else {
			res.status(404).send();
		}
	});
}

// function logPath(req) {
// 	console.log(`called ${req.path}`);
// } 