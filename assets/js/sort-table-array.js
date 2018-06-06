/* Using closure to keep a state. sortOb will keep memory of state
Using double closure to allow overloading and using function passing values */

const sortTableArray = (function () {
	const sortOb = {};
	sortOb.checkRepeat = '';
	sortOb.sortDirection = -1;
	return function (passedProp) {
		sortOb.sortDirection = -1;

		return function () {

			let prop = passedProp ? 'firstName' : this.dataset.name;
			let n = passedProp ? 0 : parseInt(this.dataset.cellIndex);

			let tbody = document.querySelector('#contactsTable>tbody');
			let sortedContactList = globalContactList.sort(sortString(prop, n, sortOb));
			createTableRows(sortedContactList);
		}
	}
})();

//---------------------------
function sortString(prop, n, sortOb) {
	/* if repeating property, invert sortDirection; if not, 
	set to 1 so that order is ascending */
	sortOb.sortDirection = sortOb.checkRepeat === prop ? -sortOb.sortDirection : 1;
	sortOb.checkRepeat = prop;

	arrowDirection2(sortOb.sortDirection, n);

	return function (a, b) {
		let aProp = a[prop].toUpperCase();
		let bProp = b[prop].toUpperCase();
		return aProp > bProp ? sortOb.sortDirection : -sortOb.sortDirection;
	}
}

function sortDate(prop, n, sortOb) {
		/* if repeating property, invert sortDirection; if not, 
	set to 1 so that order is ascending */
	sortOb.sortDirection = sortOb.checkRepeat === prop ? -sortOb.sortDirection : 1;
	sortOb.checkRepeat = prop;

	arrowDirection2(sortOb.sortDirection, n);

	return function (a, b) {
		let aProp = a[prop].toUpperCase();
		let bProp = b[prop].toUpperCase();
		return aProp > bProp ? sortOb.sortDirection : -sortOb.sortDirection;
	}
}
//---------------------------
function arrowDirection2(dir, n) {
	//select all spans
	//the one that matches, its assigned the arrow and the direction changed
	//the rest, have its value set &nbsp;

	//set to ascending or descending arrow
	let arrowDir = dir === 1 ? '&#9650;' : '&#9660;';

	let allSpans = document.querySelectorAll('#contactsTable>thead span');

	//n is the row number; i is the element that matches the row number
	//span innerHTML will be set to ascending or descending arrow
	allSpans.forEach(function (elm, i) {
		i === n ? elm.innerHTML = arrowDir : elm.innerHTML = '&nbsp;';
	});
}

//---------------------------
function createTableRows(contactList) {
	const tableBody = document.querySelector('#contactsTable > tbody');
	tableBody.innerHTML = '';

	contactList.forEach((elm, idx) => {
		const tr = document.createElement('tr');

		// idx % 2 === 0 ? tr.classList.add ('table-primary') : tr.classList.add ('table-info');

		tr.innerHTML = `
			<td itemprop='firstName'>${elm.firstName}</td>
			<td itemprop='lastName'>${elm.lastName}</td> 
			<td itemprop='phoneNumber' class='nowrap'>${elm.phoneNumber}</td>
			<td itemprop='email'>${elm.email}</td>
			<td itemprop='birthday' class='nowrap'>${elm.birthday}</td> 
			<td itemprop='notes' class='note-overflow largeCell '>${elm.notes}</td>
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

//---------------------------
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
	btn.classList.add('editButton', 'btn', 'btn-outline-primary');
	btn.addEventListener('click', editContact());
	// btn.style.minWidth = '6rem';//set fixed width to avoid adjusting behavior
	editCell.appendChild(btn);

	let trashbin = tr.cells[tr.cells.length - 1];

	function editContact() {
		edit_on = false;
		return function () {
			edit_on = !edit_on;

			this.textContent = edit_on ? 'Update' : 'Edit';
			this.classList.toggle('btn-outline-primary');
			this.classList.toggle('btn-success');

			tr.contentEditable = edit_on;
			tr.classList.toggle('textEditable');

			trashbin.contentEditable = 'false';
			editCell.contentEditable = 'false';

			if (!edit_on) putFetch(tr, this.dataset.id);
		}
	}
}

// console.log(tbody.rows[10].cells[1]);
// tbody.rows[10].cells[1]