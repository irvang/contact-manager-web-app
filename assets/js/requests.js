//====GET

function getFetch() {

	// see MDN's fetch() for options object passed as second parameter
	fetch('/contacts')
		.then(function (responseContactList) {
			/* response is the list in JSON, response.json() parses it
			body.json() */
			return responseContactList.json();

		}, err => {
			console.log(err)
		})
		.then(function (parsedJsonContactList) {

			document.querySelector('#responseDisplay').innerHTML = `
			There are ${parsedJsonContactList.length} contacts on your list :)`;

			//Creates the table, and passes the contact list reference to the function
			//mimicks a dataset object in order to use same function as the listeners
			sortTableArray.apply({
				dataset: {
					name: 'firstName',
					cellIndex: 0
				},
				startAscending: true, 
				contactListPass: parsedJsonContactList
			});
		});
}

//====POST
function postFetch(evt) {
	evt.preventDefault();//prevents form submisison
	const myObject = {};
	const inputs = document.querySelectorAll('form#myForm input');
	const responseDisplay = document.querySelector('#responseDisplay');

	inputs.forEach(function (item) {
		myObject[item.name] = item.value;
		item.value = ""
	});

	let fetchObj = fetch('/contact', {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(myObject), // data can be `string` or {object}!
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	});

	let response = fetchObj.then(res => {
		// console.log(res.statusText);
		return res;
	});

	response.catch(error => {
		console.error('Error:', error)
	})
		.then(res => {
			res.text().then(text => {
				//clear inputs after response is received
				responseDisplay.innerHTML = '&nbsp;';
				document.querySelector('#myForm span').innerHTML = text;
			});
		});

	getFetch();//reload table
}

//====PUT
function putFetch(tr, id) {
	const responseDisplay = document.querySelector('#responseDisplay');

	let cells = tr.cells;//get cells
	let obj = {};//will hold properties to update
	obj.id = id;//use this id to findByIdAndUpdate with express
	for (let i = 0; i < cells.length; i++) {//cells is array-like
		if (cells[i].attributes.itemprop) {//if there is itemprop
			let prop = cells[i].attributes.itemprop.value;//itemprop: name, last, etc
			let val = tr.cells[i].textContent;//values
			obj[prop] = val;
		}
	}

	fetch('/update-contact', {
		method: 'PUT',
		body: JSON.stringify(obj),	//convert to JSON
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then(res => {
		return res;// res.statusText;
	}).catch(error => {
		console.error('Error:', error)
	}).then(res => {
		res.text().then(text => {
			responseDisplay.innerHTML = text;
		});
	});
}

//====DELETE
function deleteContactFetch(_id) {

	let confirmation = confirm('Are you sure you want to delete this contact?');
	let bodyId = JSON.stringify({ id: _id });// {"id": ""}
	if (confirmation) {
		// let _id = parseInt(evt.target.dataset.id);

		fetch('/contact', {
			method: 'DELETE',
			body: bodyId,
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then(function (response) {
			// console.log(response);
			return response;
		}).then(function (response) {
			response.text().then(text => {
				console.log('Delete response: ' + text);
			})

			//once contact has been deleted,fetch again contacts with new array
			getFetch();
		});
	}
}
