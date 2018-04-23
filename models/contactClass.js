const Contact = require('./contactModel');

class ContactClass {
	constructor () {
		return new Contact ({
			fname: String,
			lname: String,
			phone: String
		});
	}
}

