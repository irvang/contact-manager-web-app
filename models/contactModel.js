const mongoose = require('mongoose');

// define schema
const contactSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	phoneNumber: String,
	email: String,
	birthday: String,
	notes: String
});

contactSchema.methods.doSomething = function () {

}

//define model
let Contact = mongoose.model('Contactees', contactSchema);

// returns a new Contact created by the schema model
class ContactClass {
	constructor(name, lastname, phoneNumber, email, birthday, notes) {

		//'Contact' is the schema model
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

/* 
	Same as:
	module.exports.model = Contact;
	module.exports.creator: ContactClass;
*/
module.exports = {
	model: Contact,
	creator: ContactClass
}

