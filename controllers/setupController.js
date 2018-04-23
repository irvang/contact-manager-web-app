// const ContactClass = require('../models/contactClass');
// const contactModel = require('../models/contactModel');

const Contact = require('../models/contactModel');

function seedContacts (app) {

	app.get('/api/seedContacts', (req, res, next) => {
		const startingContacts = [
			new Contact.creator('Irv', 'Ang', '3333333'),
			new Contact.creator('Johann Sebastian', 'Bach', '337775'),
			new Contact.creator('Ludwig', 'van Beethoven', '5559999'),
			new Contact.creator('John', 'Doer', '0000000')
		];

		Contact.model.create(startingContacts, (err, results) => {
			if(err) console.log(err);

			res.send(results);
		});
	});
}

module.exports = seedContacts;