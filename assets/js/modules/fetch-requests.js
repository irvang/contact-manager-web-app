"use strict";

// import sortTableArray from "./sort-table-array.js"

export { getFetch, postFetch, putFetch, deleteContactFetch, globalContactList };

let globalContactList = [];
//====GET
async function getFetch() {

	try {
		const response = await fetch('/contacts');

		/* response.json() extracts the body */
		const contactList = await response.json();

		document.querySelector('#responseDisplay').innerHTML = `
			There are ${contactList.length} contacts on your list :)`;

		globalContactList = [...contactList];

		//fire event to sort table by name once the contacts are stored globally
		let nameTh = document.querySelector('#th-firstName');
		nameTh.dispatchEvent(new Event('click'));

	} catch (err) {
		console.log(err);
	}
}

function getFetch2() {
	// see MDN's fetch() for options object passed as second parameter

	fetch('/contacts')
		.then(function (responseContactList) {
			/* response is the list in JSON, response.json() parses it
			body.json() */
			return responseContactList.json();

		})
		.then(function (parsedJsonContactList) {

			document.querySelector('#responseDisplay').innerHTML = `
			There are ${parsedJsonContactList.length} contacts on your list :)`;

			globalContactList = [...parsedJsonContactList]
			//Creates the table, and passes the contact list reference to the function
			//mimicks a dataset object in order to use same function as the listeners

			let nameTh = document.querySelector('#th-firstName');
			nameTh.dispatchEvent(new Event('click'));

		})
		.catch(error => {
			console.error('Error:', error)
		});
}

//====POST
async function postFetch(evt) {
	evt.preventDefault();//prevents form submisison
	const myObject = {};
	const inputs = document.querySelectorAll('form#myForm input');
	const responseDisplay = document.querySelector('#responseDisplay');

	inputs.forEach(function (item) {
		myObject[item.name] = item.value;
		item.value = ""
	});

	try {
		const response = await fetch('/contact', {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(myObject), // data can be `string` or {object}!
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		});

		const text = await response.text();

		//clear inputs after response is received
		responseDisplay.innerHTML = '&nbsp;';
		document.querySelector('#myForm span').innerHTML = text;
		getFetch();//reload table

	} catch (error) {
		console.error('Error:', error)
	}
}

function postFetch2(evt) {
	evt.preventDefault();//prevents form submisison
	const myObject = {};
	const inputs = document.querySelectorAll('form#myForm input');
	const responseDisplay = document.querySelector('#responseDisplay');

	inputs.forEach(function (item) {
		myObject[item.name] = item.value;
		item.value = ""
	});

	fetch('/contact', {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(myObject), // data can be `string` or {object}!
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	}).then(res => {

		//	res.text() returns a promise
		return res.text();

	}).then(text => {
		//clear inputs after response is received
		responseDisplay.innerHTML = '&nbsp;';
		document.querySelector('#myForm span').innerHTML = text;
		getFetch();//reload table

	}).catch(error => {
		console.error('Error:', error)
	});
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

		//	res.text() returns a promise
		return res.text();
	}).then(text => {
		responseDisplay.innerHTML = text;
	}).catch(error => {
		console.error('Error:', error)
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

			//	res.text() returns a promise
			return response.text()

		}).then(text => {

			// console.log('Delete response: ' + text);
			//once contact has been deleted,fetch again contacts with new array
			getFetch();
		})
			.catch(error => {
				console.error('Error:', error)
			});
	}
}
