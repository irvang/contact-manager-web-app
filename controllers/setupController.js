// const ContactClass = require('../models/contactClass');
// const contactModel = require('../models/contactModel');

const Contact = require('../models/contactModel');

function seedContacts(app) {

	app.get('/api/seedContacts', (req, res, next) => {
		const startingContacts = [
			new Contact.creator('Irv', 'Ang', '3333333'),
			new Contact.creator('Johann Sebastian', 'Bach', '337775'),
			new Contact.creator('Ludwig', 'van Beethoven', '5559999'),
			new Contact.creator('John', 'Doer', '0000000')
		];

		Contact.model.create(contacts, (err, results) => {
			if (err) console.log(err);

			res.send(results);
		});
	});
}

module.exports = seedContacts;

// For JSON generator https://next.json-generator.com/N1S2aKxp4
[
	{
		'repeat(20, 20)': {
			_id: '{{objectId()}}',

			firstName: '{{firstName()}}',
			lastName: '{{surname()}}',

			email(tags) {
				return `${this.firstName}.${this.lastName}@${this.firstName.substring(0,3)}${this.lastName.substring(0,4)}.com`.toLowerCase();
			},
			// company: '{{company().toUpperCase()}}',
			phone: '+1 {{phone()}}',
			birthday: `{{integer(1, 12)}}-{{integer(1,31)}}-{{integer(1900, 2018)}} `,
			notes: `{{lorem(10, "words")}}`,

		}
	}
]


const contacts = [
	{
	  "_id": "5ae7ed2d0a5f9d03a7b6b326",
	  "firstName": "Sabrina",
	  "lastName": "Ortiz",
	  "email": "sabrina.ortiz@saborti.com",
	  "phone": "+1 (916) 413-3057",
	  "birthday": "7-7-1953 ",
	  "notes": "dolore commodo ipsum tempor veniam irure quis adipisicing exercitation magna"
	},
	{
	  "_id": "5ae7ed2d6b8c6cdbb71d8b74",
	  "firstName": "Hudson",
	  "lastName": "Brennan",
	  "email": "hudson.brennan@hudbren.com",
	  "phone": "+1 (993) 446-3332",
	  "birthday": "9-8-1959 ",
	  "notes": "velit non velit dolor eiusmod ad est dolor culpa proident"
	},
	{
	  "_id": "5ae7ed2d383bebb2646074e4",
	  "firstName": "Kari",
	  "lastName": "Carson",
	  "email": "kari.carson@karcars.com",
	  "phone": "+1 (803) 493-3200",
	  "birthday": "6-12-1992 ",
	  "notes": "irure ut culpa veniam ex eu excepteur velit anim quis"
	},
	{
	  "_id": "5ae7ed2d9d4a0aa98a780684",
	  "firstName": "Marks",
	  "lastName": "Odom",
	  "email": "marks.odom@marodom.com",
	  "phone": "+1 (825) 504-2896",
	  "birthday": "1-14-1940 ",
	  "notes": "et incididunt do do cillum ad cupidatat est veniam incididunt"
	},
	{
	  "_id": "5ae7ed2d2a22ba7e5a74ce70",
	  "firstName": "Lillie",
	  "lastName": "Snow",
	  "email": "lillie.snow@lilsnow.com",
	  "phone": "+1 (838) 540-2552",
	  "birthday": "8-11-1945 ",
	  "notes": "deserunt cillum exercitation laborum voluptate ex anim nulla reprehenderit in"
	},
	{
	  "_id": "5ae7ed2de02f4ac3b90afd15",
	  "firstName": "Moore",
	  "lastName": "Mann",
	  "email": "moore.mann@moomann.com",
	  "phone": "+1 (993) 418-3235",
	  "birthday": "12-30-1925 ",
	  "notes": "veniam excepteur reprehenderit ullamco et sunt fugiat do excepteur laboris"
	},
	{
	  "_id": "5ae7ed2dbbac41e0ffb4458a",
	  "firstName": "Rosetta",
	  "lastName": "Mullen",
	  "email": "rosetta.mullen@rosmull.com",
	  "phone": "+1 (802) 441-2822",
	  "birthday": "3-5-1935 ",
	  "notes": "eiusmod sit est laborum officia fugiat cupidatat laboris exercitation ad"
	},
	{
	  "_id": "5ae7ed2d8d5c138fe5052a5e",
	  "firstName": "Lynn",
	  "lastName": "Schwartz",
	  "email": "lynn.schwartz@lynschw.com",
	  "phone": "+1 (975) 438-3380",
	  "birthday": "6-28-1998 ",
	  "notes": "nulla cupidatat nostrud minim ea sit enim labore anim eu"
	},
	{
	  "_id": "5ae7ed2dd015ce6a789417dc",
	  "firstName": "Hayes",
	  "lastName": "Bradshaw",
	  "email": "hayes.bradshaw@haybrad.com",
	  "phone": "+1 (970) 416-2048",
	  "birthday": "6-23-1960 ",
	  "notes": "dolor deserunt Lorem anim est sit officia officia eu do"
	},
	{
	  "_id": "5ae7ed2de60ca64086b2d642",
	  "firstName": "Barry",
	  "lastName": "Stuart",
	  "email": "barry.stuart@barstua.com",
	  "phone": "+1 (865) 518-3486",
	  "birthday": "1-2-1960 ",
	  "notes": "laborum velit culpa labore tempor eu adipisicing deserunt cupidatat ea"
	},
	{
	  "_id": "5ae7ed2d0229f0c480afabee",
	  "firstName": "Matthews",
	  "lastName": "Sanchez",
	  "email": "matthews.sanchez@matsanc.com",
	  "phone": "+1 (923) 484-2003",
	  "birthday": "3-0-1979 ",
	  "notes": "amet aliqua pariatur culpa duis reprehenderit deserunt ea laboris quis"
	},
	{
	  "_id": "5ae7ed2d407a63dc6a4906be",
	  "firstName": "Suzette",
	  "lastName": "Herman",
	  "email": "suzette.herman@suzherm.com",
	  "phone": "+1 (968) 504-3323",
	  "birthday": "2-13-1914 ",
	  "notes": "labore in quis aliquip eiusmod ullamco laborum veniam consectetur elit"
	},
	{
	  "_id": "5ae7ed2d76fa29b1f685b045",
	  "firstName": "Stuart",
	  "lastName": "Blanchard",
	  "email": "stuart.blanchard@stublan.com",
	  "phone": "+1 (894) 507-3820",
	  "birthday": "7-16-2005 ",
	  "notes": "id ut mollit laboris dolore et deserunt Lorem veniam aute"
	},
	{
	  "_id": "5ae7ed2dcc5b20575126877e",
	  "firstName": "Fay",
	  "lastName": "Conway",
	  "email": "fay.conway@fayconw.com",
	  "phone": "+1 (869) 425-2834",
	  "birthday": "2-13-1999 ",
	  "notes": "exercitation quis ad elit duis sit eu excepteur labore esse"
	},
	{
	  "_id": "5ae7ed2d0a5d3349eea640f9",
	  "firstName": "Howe",
	  "lastName": "Tillman",
	  "email": "howe.tillman@howtill.com",
	  "phone": "+1 (859) 539-3451",
	  "birthday": "2-25-1942 ",
	  "notes": "sunt in qui magna nostrud occaecat esse sit proident est"
	},
	{
	  "_id": "5ae7ed2d136fd1508c434c27",
	  "firstName": "Melisa",
	  "lastName": "Kirby",
	  "email": "melisa.kirby@melkirb.com",
	  "phone": "+1 (865) 505-2409",
	  "birthday": "2-22-1945 ",
	  "notes": "anim eu excepteur cupidatat exercitation enim labore eu do anim"
	},
	{
	  "_id": "5ae7ed2d8a729660341c4370",
	  "firstName": "Holloway",
	  "lastName": "Neal",
	  "email": "holloway.neal@holneal.com",
	  "phone": "+1 (824) 591-2422",
	  "birthday": "5-12-1910 ",
	  "notes": "in ullamco id aliquip enim incididunt do mollit deserunt minim"
	},
	{
	  "_id": "5ae7ed2dc4f436217b725df3",
	  "firstName": "Laurie",
	  "lastName": "Chase",
	  "email": "laurie.chase@lauchas.com",
	  "phone": "+1 (921) 416-2530",
	  "birthday": "8-17-1909 ",
	  "notes": "aliqua enim laboris qui proident irure id proident est incididunt"
	},
	{
	  "_id": "5ae7ed2d5a8a980987ad3d92",
	  "firstName": "Daisy",
	  "lastName": "Macdonald",
	  "email": "daisy.macdonald@daimacd.com",
	  "phone": "+1 (846) 525-2901",
	  "birthday": "2-22-2011 ",
	  "notes": "occaecat occaecat laboris veniam in nisi nostrud officia aliqua esse"
	},
	{
	  "_id": "5ae7ed2da359f01cc029c2f7",
	  "firstName": "James",
	  "lastName": "Webster",
	  "email": "james.webster@jamwebs.com",
	  "phone": "+1 (907) 507-2323",
	  "birthday": "5-12-2009 ",
	  "notes": "eu Lorem labore dolor ea est culpa aute culpa proident"
	}
  ]