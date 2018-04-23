const mongoose = require('mongoose');

// define schema
const contactSchema = mongoose.Schema({
	fname: String,
	lname: String,
	phone: String
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
			fname: name,
			lname: lastname,
			phone: phoneNumber
		});
	}
}

// module.exports = Contact;

module.exports = {
	model: Contact, 
	creator: ContactClass
}