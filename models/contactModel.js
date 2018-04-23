const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
	fname: String,
	lname: String,
	phone: String
});

contactSchema.methods.doSomething = function () {

}

let Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;