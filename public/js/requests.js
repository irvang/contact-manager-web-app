const postFetch = (function () {
	const myObject = {};
	const inputs = document.querySelectorAll('form#myForm > input');
	const responseDisplay = document.querySelector('#responseDisplay');

	return function () {
		inputs.forEach(function (item) {
			myObject[item.name] = item.value;
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
					responseDisplay.innerHTML = text;
				});
			});
	}
})();

//====FETCH
function getFetch() {

	// see MDN's fetch() for options object passed as second parameter
	fetch('/contacts')
		.then(function (responseContactList) {
			// response is the list in JSON, response.json() parses it
			//body.json() 
			return responseContactList.json();

		})
		.then(function (parsedJsonContactList) {
			document.querySelector('#responseDisplay').innerHTML = `
			There are ${parsedJsonContactList.length} contacts on your list :)`;

			createTableRows(parsedJsonContactList);
		});
}

//---------------------------
function createTableRows(contactList) {
	const tableBody = document.querySelector('#contactsTable > tbody');
	tableBody.innerHTML = '';

	contactList.forEach((elm) => {
		const tr = document.createElement('tr');

		tr.innerHTML = `
			<td itemprop='firstName'>${elm.firstName}</td>
			<td itemprop='lastName'>${elm.lastName}</td> 
			<td itemprop='phoneNumber'>${elm.phoneNumber}</td>
			<td itemprop='email'>${elm.email}</td>
			<td itemprop='birthday'>${elm.birthday}</td> 
			<td itemprop='notes' class='largeCell'>${elm.notes}</td>
		`;

		//id added to row and to button
		createEditButton(tr, elm);

		//create TRASHBIN
		const trashBin = tr.insertCell();
		trashBin.classList.add('trashIcon');
		trashBin.dataset.id = elm._id;
		trashBin.addEventListener('click', function (evt) {
			deleteContactFetch(evt.target.dataset.id)
		});

		tableBody.appendChild(tr);
	});
}

function createEditButton(tr, elm) {
	//create BUTTON
	const editCell = tr.insertCell();
	const btn = document.createElement('button');
	btn.dataset.id = elm._id;
	btn.textContent = 'Edit';
	btn.classList.add('editButton');
	btn.addEventListener('click', makeEditable);
	editCell.appendChild(btn);

	function makeEditable(evt) {
		this.textContent = 'Update';
		this.removeEventListener('click', makeEditable);//this is the button
		this.addEventListener('click', updateContact);
		tr.contentEditable = 'true';
		// console.log(this);
	}

	function updateContact(evt) {

		putFetch(tr, this.dataset.id);
		tr.contentEditable = 'false';
		this.textContent = 'Edit';
		this.removeEventListener('click', updateContact);//this is the button
		this.addEventListener('click', makeEditable);

		// console.log(this);
	}
}

function putFetch(tr, id) {
	const responseDisplay = document.querySelector('#responseDisplay');

	let cells = tr.cells;
	let obj = {};
	obj.id = id;
	for (let i = 0; i < cells.length; i++) {
		if (cells[i].attributes.itemprop) {
			// cells[i].contentEditable = true;
			let prop = cells[i].attributes.itemprop.value;
			let val = tr.cells[i].textContent;
			obj[prop] = val;
		}
	}
	console.log(this);

	let fetchObj = fetch('/update-contact', {
		method: 'PUT', // or 'PUT'
		body: JSON.stringify(obj), // data can be `string` or {object}!
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
				responseDisplay.innerHTML = text;
			});
		});
}

//---------------------------
function deleteContactFetch(_id) {

	let confirmation = confirm('Are you sure you want to delete this contact?');
	let bodyId = JSON.stringify({ id: _id });
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
		});

		//fetch again contacts with new array
		getFetch();

	}
}

/* 










*/
//====POST FETCH
const getInputValues = (function () {
	//create and select only once
	const myObject = {};
	const inputs = document.querySelectorAll('form#myForm > input');

	//add key value pairs extracted from the inputs
	return function () {
		inputs.forEach(function (item) {
			myObject[item.name] = item.value;
		});
		return myObject;
	}
})();

function postFetch2() {

	const inputs = getInputValues();

	let fetchObj = fetch('/contact', {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(inputs), // data can be `string` or {object}!
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
				document.querySelector('div').innerHTML = text;
			});
		});
}

//====GET
function testGet() {

	let xhr = new XMLHttpRequest();

	xhr.open('get', '/contacts', true);
	xhr.setRequestHeader("Content-type", "text/html");

	xhr.onreadystatechange = function () {
		// Process the server response here.
		// console.log('allHeaders: ', xhr.getAllResponseHeaders());

		if (this.readyState == 4 && this.status == 200) {

			formatGetResponse(xhr.responseText);
			// console.log('responseText: ', xhr.responseText);
			// console.log(typeof this.readyState, this.status);
			// console.log('responseText: ', xhr);
		}

	}
	// xhr.onload = function () { }
	// let data = JSON.stringify({ firstname: 'Jane', lastname: 'Doer' });
	// xhr.send(data);

	xhr.send();
	return false;
}

function formatGetResponse(resText) {
	const contacts = JSON.parse(resText);

	let tableBody = document.querySelector('#contactsTable > tbody');
	tableBody.innerHTML = '';

	contacts.forEach((elm, index, array) => {
		let tr = document.createElement('tr');
		tr.innerHTML = `<td>${elm.firstName}</td><td> ${elm.lastName}</td> <td> ${elm.phoneNumber}</td>`;
		tableBody.appendChild(tr);
	});
}

function comingSoon(verb) {
	document.querySelector('div').innerHTML = '<strong>' + verb + '</strong>' + ' Coming soon!';
}

