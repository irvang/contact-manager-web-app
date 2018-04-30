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

/* For JSON generator
[
	{
	  'repeat(20, 20)': {
		_id: '{{objectId()}}',
  
		  firstName: '{{firstName()}}',
		  lastName: '{{surname()}}',
  
		email(tags) {
		  return `${this.firstName}.${this.lastName}@someCompany.com`;
		},
		company: '{{company().toUpperCase()}}',
		phone: '+1 {{phone()}}',
	  birthday: `{{integer(0, 12)}}-{{integer(0,31)}}-{{integer(1900, 2018)}} `,
		notes: ``,
		tags: [
			{
			  'repeat(5)': '{{lorem(1, "words")}}'
			}
		  ]
	   
	  }
	}
  ] 
  */