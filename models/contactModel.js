const mongoose = require('mongoose');

// define schema
const contactSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	phoneNumber: String,
	email: String,
	birthday: Date,
	notes: String
});

contactSchema.methods.doSomething = function () {

}

//define model
let Contact = mongoose.model('Contact', contactSchema);

// returns a new Contact created by the schema model
class ContactClass {
	constructor(name, lastname, phoneNumber, email, birthday, notes) {

		//'Contact' is the schema mdoel
		return new Contact({
			firstName: name,
			lastName: lastname,
			phoneNumber: phoneNumber,
			email: email,
			birthday: birthday,
			notes: notes
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