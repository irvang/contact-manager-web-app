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
			phoneNumber: '+1 {{phone()}}',
			birthday: `{{integer(1, 12)}}-{{integer(1,31)}}-{{integer(1900, 2018)}} `,
			notes: `{{lorem(10, "words")}}`,

		}
	}
]


const contacts = [
	{
	//   "_id": "5ae866c6bc50809fd57e7c80",
	  "firstName": "Castaneda",
	  "lastName": "Compton",
	  "email": "castaneda.compton@cascomp.com",
	  "phoneNumber": "+1 (943) 417-3340",
	  "birthday": "6-10-1977 ",
	  "notes": "quis esse ea anim Lorem eiusmod nostrud id cillum veniam"
	},
	{
	//   "_id": "5ae866c6867c938217fc877e",
	  "firstName": "Valencia",
	  "lastName": "Cummings",
	  "email": "valencia.cummings@valcumm.com",
	  "phoneNumber": "+1 (805) 529-3222",
	  "birthday": "10-10-1958 ",
	  "notes": "laborum ea id id ut occaecat anim Lorem tempor aliquip"
	},
	{
	//   "_id": "5ae866c6d2e513ec364d47b3",
	  "firstName": "Guthrie",
	  "lastName": "Ashley",
	  "email": "guthrie.ashley@gutashl.com",
	  "phoneNumber": "+1 (934) 409-3519",
	  "birthday": "3-2-1941 ",
	  "notes": "minim minim irure velit aliqua aliquip elit deserunt ullamco est"
	},
	{
	//   "_id": "5ae866c61a1142236ece2ff3",
	  "firstName": "Goldie",
	  "lastName": "Kirby",
	  "email": "goldie.kirby@golkirb.com",
	  "phoneNumber": "+1 (863) 552-3400",
	  "birthday": "4-7-1979 ",
	  "notes": "non consectetur Lorem excepteur in et cupidatat anim proident adipisicing"
	},
	{
	//   "_id": "5ae866c6a44c0a1f482dd154",
	  "firstName": "Cecile",
	  "lastName": "Bradford",
	  "email": "cecile.bradford@cecbrad.com",
	  "phoneNumber": "+1 (958) 440-3230",
	  "birthday": "2-13-1922 ",
	  "notes": "irure pariatur sint id cillum consequat labore laboris fugiat et"
	},
	{
	//   "_id": "5ae866c6a6cb2e61ae8572f6",
	  "firstName": "Leann",
	  "lastName": "Flowers",
	  "email": "leann.flowers@leaflow.com",
	  "phoneNumber": "+1 (951) 510-3806",
	  "birthday": "10-31-1938 ",
	  "notes": "nostrud aliqua anim consequat id culpa pariatur ea dolore non"
	},
	{
	//   "_id": "5ae866c63b7b3e614f4bf9b2",
	  "firstName": "Rene",
	  "lastName": "Salas",
	  "email": "rene.salas@rensala.com",
	  "phoneNumber": "+1 (920) 487-3248",
	  "birthday": "9-16-1987 ",
	  "notes": "cillum ex irure occaecat in in pariatur aute sit tempor"
	},
	{
	//   "_id": "5ae866c68706123e75e20276",
	  "firstName": "Nicole",
	  "lastName": "Blanchard",
	  "email": "nicole.blanchard@nicblan.com",
	  "phoneNumber": "+1 (805) 506-3280",
	  "birthday": "9-7-1987 ",
	  "notes": "aute sunt sunt labore occaecat excepteur sint tempor dolor sint"
	},
	{
	//   "_id": "5ae866c682006cb732776d55",
	  "firstName": "Dionne",
	  "lastName": "Cervantes",
	  "email": "dionne.cervantes@diocerv.com",
	  "phoneNumber": "+1 (925) 448-2758",
	  "birthday": "12-28-2009 ",
	  "notes": "exercitation elit sit magna laborum amet commodo veniam eu veniam"
	},
	{
	//   "_id": "5ae866c62a54968cd1141344",
	  "firstName": "Jeannine",
	  "lastName": "Griffith",
	  "email": "jeannine.griffith@jeagrif.com",
	  "phoneNumber": "+1 (825) 452-2019",
	  "birthday": "12-20-1952 ",
	  "notes": "excepteur voluptate excepteur minim anim et nulla quis labore pariatur"
	},
	{
	//   "_id": "5ae866c60f3fbdea40f4a5ce",
	  "firstName": "Matthews",
	  "lastName": "Roy",
	  "email": "matthews.roy@matroy.com",
	  "phoneNumber": "+1 (925) 554-2888",
	  "birthday": "3-26-1971 ",
	  "notes": "dolore incididunt ad dolore sit proident labore reprehenderit esse et"
	},
	{
	//   "_id": "5ae866c6ce0390dceb50837d",
	  "firstName": "Branch",
	  "lastName": "Gould",
	  "email": "branch.gould@bragoul.com",
	  "phoneNumber": "+1 (944) 403-2954",
	  "birthday": "8-18-1924 ",
	  "notes": "pariatur occaecat velit voluptate qui occaecat pariatur aliquip proident elit"
	},
	{
	//   "_id": "5ae866c66f66317f849756eb",
	  "firstName": "Mathews",
	  "lastName": "Battle",
	  "email": "mathews.battle@matbatt.com",
	  "phoneNumber": "+1 (956) 484-2357",
	  "birthday": "6-26-1998 ",
	  "notes": "nulla laborum laborum commodo elit adipisicing nisi adipisicing aliqua commodo"
	},
	{
	//   "_id": "5ae866c63e549461833c050c",
	  "firstName": "Mccarty",
	  "lastName": "Barr",
	  "email": "mccarty.barr@mccbarr.com",
	  "phoneNumber": "+1 (800) 578-3413",
	  "birthday": "8-6-1996 ",
	  "notes": "consequat dolore occaecat labore aliquip eiusmod duis veniam eu irure"
	},
	{
	//   "_id": "5ae866c6e63a7cd6a33ed6a0",
	  "firstName": "Opal",
	  "lastName": "Lane",
	  "email": "opal.lane@opalane.com",
	  "phoneNumber": "+1 (983) 491-2097",
	  "birthday": "10-21-2009 ",
	  "notes": "proident occaecat pariatur commodo ipsum sit occaecat et voluptate mollit"
	},
	{
	//   "_id": "5ae866c6a1f1566be48b2cbe",
	  "firstName": "Snider",
	  "lastName": "Cochran",
	  "email": "snider.cochran@snicoch.com",
	  "phoneNumber": "+1 (800) 557-2538",
	  "birthday": "9-21-1987 ",
	  "notes": "elit exercitation dolore magna excepteur culpa elit sunt ut magna"
	},
	{
	//   "_id": "5ae866c64f8dbba26c3a4ca5",
	  "firstName": "Constance",
	  "lastName": "Rodgers",
	  "email": "constance.rodgers@conrodg.com",
	  "phoneNumber": "+1 (951) 582-2598",
	  "birthday": "12-31-1999 ",
	  "notes": "nostrud officia laborum ea ut laboris ad dolore mollit excepteur"
	},
	{
	//   "_id": "5ae866c62715808b8220cfc7",
	  "firstName": "Cote",
	  "lastName": "Cash",
	  "email": "cote.cash@cotcash.com",
	  "phoneNumber": "+1 (977) 505-2459",
	  "birthday": "2-16-1975 ",
	  "notes": "laborum eu aliquip fugiat incididunt ad cupidatat veniam labore non"
	},
	{
	//   "_id": "5ae866c6f81446d35989b311",
	  "firstName": "Mccarthy",
	  "lastName": "Benton",
	  "email": "mccarthy.benton@mccbent.com",
	  "phoneNumber": "+1 (958) 449-2740",
	  "birthday": "7-6-1993 ",
	  "notes": "tempor ex in id reprehenderit quis dolor ullamco elit culpa"
	},
	{
	//   "_id": "5ae866c6b6965f290cb1953a",
	  "firstName": "Lynda",
	  "lastName": "Little",
	  "email": "lynda.little@lynlitt.com",
	  "phoneNumber": "+1 (839) 461-3655",
	  "birthday": "11-26-1954 ",
	  "notes": "Lorem velit eu anim aliquip minim ea do ut deserunt"
	}
  ]