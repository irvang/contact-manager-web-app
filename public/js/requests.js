
let form = document.querySelector('#myForm');;
form.addEventListener('submit', function (e) {
	e.preventDefault();

	// console.log(e);
	sendData();
});

function sendData() {

	var XHR = new XMLHttpRequest();

	// Bind the FormData object and the form element
	var FD = new FormData(form);

	// Define what happens on successful data submission
	XHR.addEventListener("load", function (event) {
		// alert(event.target.responseText);
		document.querySelector('div').innerHTML = event.target.responseText;
	});

	// Define what happens in case of error
	XHR.addEventListener("error", function (event) {
		alert('Oops! Something went wrong.');
	});

	const myObject = {};
	// Display the key/value pairs
	for (var pair of FD.entries()) {
		myObject[pair[0]] = pair[1];
	}

	// Set up our request
	XHR.open("POST", '/contact2', true);
	XHR.setRequestHeader("Content-type", "application/json");

	//send data formatted as json
	XHR.send(JSON.stringify(myObject));
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
			document.querySelector('div').innerHTML = xhr.responseText;
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