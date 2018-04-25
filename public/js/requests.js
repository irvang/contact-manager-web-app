function postFetch() {

	const inputs = {
		fname: document.querySelector('#fname').value,
		lname: document.querySelector('#lname').value,
		phone: document.querySelector('#phone').value
	}

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

//====FETCH
function testFetch() {

	// see MDN's fetch() for options object passed as second parameter
	fetch('/contacts')
		.then(function (response) {
			// console.log(response);
			//body.json() 
			return response.json();
		})
		.then(function (myJson) {
			// console.log(myJson);
			const contacts = myJson;
			let tableBody = document.querySelector('#contactsTable > tbody');
			tableBody.innerHTML = '';
		
			contacts.forEach((elm, index, array) => {
				let tr = document.createElement('tr');
				tr.innerHTML = `<td>${elm.fname}</td><td> ${elm.lname}</td> <td> ${elm.phone}</td>`;
				tableBody.appendChild(tr);
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
		tr.innerHTML = `<td>${elm.fname}</td><td> ${elm.lname}</td> <td> ${elm.phone}</td>`;
		tableBody.appendChild(tr);
	});
}



function comingSoon(verb) {
	document.querySelector('div').innerHTML = '<strong>' + verb + '</strong>' + ' Coming soon!';
}


	// fetch('/contact', {
	// 	method: 'POST', // or 'PUT'
	// 	body: jsonObj, // data can be `string` or {object}!
	// 	headers: new Headers({
	// 		'Content-Type': 'application/json'
	// 	})
	// }).then(res => {
	// 	// res.text().then(text => console.log('after promise',text));
	// 	// console.log(res.statusText);
	// 	return res;
	// }).
	// text()
	// .then(text => {
	// 	console.log('here', text)
	// })
	// 	.catch(error => {
	// 		console.error('Error:', error)
	// 	})
	// 	.then(response => {
	// 		console.log('Success:', response)
	// 	});