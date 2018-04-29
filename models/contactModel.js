const mongoose = require('mongoose');

// define schema
const contactSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	phoneNumber: String, 
	email: String,
	address: String,
	birthday: Date,
	notes: String
});

contactSchema.methods.doSomething = function () {

}

//define model
let Contact = mongoose.model('Contact', contactSchema);

// returns a new Contact created by the schema model
class ContactClass {
	constructor (name, lastname, phoneNumber) {

		//'Contact' is the schema mdoel
		return new Contact ({
			firstName: name,
			lastName: lastname,
			phoneNumber: phoneNumber
		});
	}
}

module.exports = {
	model: Contact, 
	creator: ContactClass
}


/* 
Fields:
name
lastName
phoneNumber
email

address
birthday
notes


*/