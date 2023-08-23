const express = require('express');
const bodyParser = require('body-parser');
const Contact = require('../models/contactModel');
const path = require('path');

//Assigns methods to app
module.exports = function (app) {
	//====MIDDLEWARE
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	//====LANDING page
	app.use('/', express.static('views'));//rendering static html

	//====GET - all contacts
	app.get('/contacts', async (req, res, next) => {
		try {
			const allContacts = await Contact.model.find({})
			res.send(allContacts)
		} catch (error) {
			console.error(error)
			res.status(400).send({ message: "No contacts found" })
		}
	});

	//====POST - post new contact to database
	//contacts/
	app.post('/contact', async (req, res, next) => {
		try {

			//deconstruncting for cleaner code
			const { firstName, lastName, phoneNumber, email, birthday, notes } = req.body;

			//convert to array, then to mm-dd-yyyy format
			let bday = birthday.split('-');
			bday = `${bday[1] || 0}-${bday[2] || 0}-${bday[0] || 0}`;

			const newContact = new Contact.creator(
				firstName, lastName, phoneNumber, email, bday, notes);

			const contact = await newContact.save()

			res.send('Contact saved successfully!')
		} catch (error) {
			console.error('ERROR in /contact', error)
			res.send(` &nbsp;&nbsp; <strong>${firstName} ${lastName} </strong>added to contact list!`);
		}
	});

	//====PUT - change a contact by its id
	//contacts/:id
	app.put('/contact/:id', async (req, res, next) => {
		try {
			const { id } = req.params;
			const { firstName, lastName, phoneNumber, email, birthday, notes } = req.body;
			if (!id) {
				res.send('Sorry, unable to find contact');
			}
			const deletedContact = await Contact.model.findByIdAndUpdate(id, {
				//schema
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber,
				email: email,
				birthday: birthday,
				notes: notes

				//callback
			});

			res.send('Success! Contact updated');

		} catch (error) {
			console.error(error)
			res.send('Sorry, unable to find contact');
		}
	});

	//====DELETE - delete a contact by its id?
	// /contacts/:id
	app.delete('/contact', async (req, res, next) => {
		try {

			if (req.body.id) {
				let q = await Contact.model.findByIdAndRemove(req.body.id)
				res.send('Contact deleted successfully!');
			} else {
				res.status(404).send();
			}

		} catch (error) {
			console.error(error)
			res.status(404).send();
		}
	});
}