"use strict";

import { resetCheckRepeat } from "./sort-table-array.js"

export { getFetch, postFetch, putFetch, deleteContactFetch, globalContactList };

let globalContactList = [];

//====GET
async function getFetch() {

	// Fetch
	try {
		const response = await fetch('/contacts');

		/* response.json() extracts the body */
		const contactList = await response.json();

		document.querySelector('#responseDisplay').innerHTML = `
			There are ${contactList.length} contacts on your list :)`;

		globalContactList = [...contactList];

		resetCheckRepeat();

		//fire event to sort table by name once the contacts are stored globally
		let nameTh = document.querySelector('#th-firstName');
		nameTh.dispatchEvent(new Event('click'));

	} catch (err) {
		console.log(err);
	}
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

	// Fetch
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

	} catch (err) {
		console.error('Error:', err)
	}
}

//====PUT
async function putFetch(tr, id) {

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

	// Fetch
	try {
		let response = await fetch('/update-contact', {
			method: 'PUT',
			body: JSON.stringify(obj),	//convert to JSON
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		});

		let text = await response.text();
		document.querySelector('#responseDisplay').innerHTML = text;

	} catch (err) {
		console.error('Error:', error)
	}
}

//====DELETE
async function deleteContactFetch(_id) {

	let confirmation = confirm('Are you sure you want to delete this contact?');
	if (confirmation) {

		let bodyId = JSON.stringify({ id: _id });// {"id": ""}
		// let _id = parseInt(evt.target.dataset.id);

		try {

			const options = {
				method: 'DELETE',
				body: bodyId,
				headers: new Headers({
					'Content-Type': 'application/json'
				})
			};

			const response = await fetch('/contact', options);

			const text = await response.text();

			// console.log('Delete response: ' + text);
			//once contact has been deleted,fetch again contacts with new array
			// resetCheckRepeat();
			getFetch();


		} catch (err) {
			console.error('Error:', err)
		}
	}
}
