//====POST
function postFetch(evt) {
	evt.preventDefault();//prevents form submisison
	const myObject = {};
	const inputs = document.querySelectorAll('form#myForm input');
	const responseDisplay = document.querySelector('#responseDisplay');

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

	// getFetch();//reload table
};

//====GET
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

			//sort table after creation
			sortTable(0)();
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

/* 
Creates edit button and adds listeners. 
Toggles button's textContent, contenteditable, and listener functions
*/
function createEditButton(tr, elm) {
	//create BUTTON
	const editCell = tr.insertCell();
	const btn = document.createElement('button');
	btn.dataset.id = elm._id;
	btn.textContent = 'Edit';
	btn.classList.add('editButton');
	btn.addEventListener('click', makeEditable);
	editCell.appendChild(btn);

	let trashbin = tr.cells[tr.cells.length - 1];
	function makeEditable(evt) {
		//this === button
		this.textContent = 'Update';
		this.removeEventListener('click', makeEditable);
		this.addEventListener('click', updateContact);
		tr.contentEditable = 'true';

		//keep button, editcell, and trashbin uneditable
		trashbin.contentEditable = 'false';
		editCell.contentEditable = 'false';
	}

	function updateContact(evt) {
		putFetch(tr, this.dataset.id);
		tr.contentEditable = 'false';
		//this === button
		this.textContent = 'Edit';
		this.removeEventListener('click', updateContact);
		this.addEventListener('click', makeEditable);
	}
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
