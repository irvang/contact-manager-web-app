/* Using closure to keep a state. sortOb will keep memory of state
Using double closure to allow overloading and using function passing values */

import { getFetch, putFetch, deleteContactFetch, globalContactList } from "./requests.js";

const startAscending = true;
const sortOb = {};
sortOb.checkRepeat = '';
sortOb.sortDirection = -1;
sortOb.contactList = [];

export default function sortTableArray(evt) {

	// return function () {

	//if there is a flag property passed, start in ascending order
	if (startAscending) {
		sortOb.contactList = globalContactList;
		sortOb.sortDirection = -1
	};

	let prop = evt.target.dataset.name;
	let n = parseInt(evt.target.dataset.cellIndex);

	let tbody = document.querySelector('#contactsTable>tbody');
	let sortedContactList = [];
	if (prop === 'birthday') {
		sortedContactList = sortOb.contactList.sort(sortDate(prop, n, sortOb));
	} else {
		sortedContactList = sortOb.contactList.sort(sortString(prop, n, sortOb));
	}

	createTableRows(sortedContactList);
	// }
}

//bind to fake dataset and cellIndex. Adds a flag to always sort in ascending order.
// let boundSortTableArray = sortTableArray.bind({ dataset: { name: 'firstName', cellIndex: 0 }, flag: true });

//---------------------------
function sortString(prop, n, sortOb) {
	/* if repeating property, invert sortDirection; if not, 
	set to 1 so that order is ascending */
	sortOb.sortDirection = sortOb.checkRepeat === prop ? -sortOb.sortDirection : 1;
	sortOb.checkRepeat = prop;

	arrowDirection(sortOb.sortDirection, n);

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

	arrowDirection(sortOb.sortDirection, n);

	return function (a, b) {
		let aProp = new Date(a[prop]);
		let bProp = new Date(b[prop]);
		return aProp > bProp ? -sortOb.sortDirection : sortOb.sortDirection;
	}
}
//---------------------------
function arrowDirection(dir, n) {
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
			<td itemprop='notes' class='note-overflow largeCell'>${elm.notes}</td>
		`;

		//id added to row and to button
		createEditButton(tr, elm);

		createTrashBin(tr, elm);

		tableBody.appendChild(tr);
	});
}

function createTrashBin(tr, elm) {
	const trashBin = tr.insertCell();
	trashBin.classList.add('trashIcon');
	trashBin.dataset.id = elm._id;
}

//---------------------------
/* 
Creates edit button and adds listeners. 
Toggles button's textContent, contenteditable, and listener functions
*/
function createEditButton(tr, elm) {
	//create cell for button
	const editCell = tr.insertCell();

	//create BUTTON
	const btn = document.createElement('button');

	btn.dataset.id = elm._id;
	btn.dataset.editMode = false;

	btn.textContent = 'Edit';
	btn.classList.add('editButton', 'btn', 'btn-outline-primary', 'btn-sm');
	// btn.style.minWidth = '6rem';//set fixed width to avoid adjusting behavior
	editCell.appendChild(btn);
}

let contactsTable = document.querySelector('#contactsTable');
contactsTable.addEventListener('click', evt => {

	if (evt.target && evt.target.matches('td>button.editButton')) {
		buttonsListener(evt);
	} else if (evt.target && evt.target.matches('td.trashIcon')) {
		deleteContactFetch(evt.target.dataset.id);
	}
});


function buttonsListener(evt) {

	let tr = evt.target.parentElement.parentElement;
	let trashbin = tr.cells[tr.cells.length - 1];
	let editCell = evt.target.parentElement;

	let { dataset } = evt.target;

	//typeof editMode is string, therefore, if  
	// editMode === "true", return true, else false.
	//stores flipped value as a bolean on "editMode." 
	let editMode = !(dataset.editMode === "true");
	dataset.editMode = editMode;

	evt.target.textContent = editMode ? 'Update' : 'Edit';
	evt.target.classList.toggle('btn-outline-primary');
	evt.target.classList.toggle('btn-success');

	tr.contentEditable = editMode;
	tr.classList.toggle('textEditable');

	trashbin.contentEditable = 'false';
	editCell.contentEditable = 'false';

	if (!editMode)
		putFetch(tr, evt.target.dataset.id);
}
// console.log(tbody.rows[10].cells[1]);
// tbody.rows[10].cells[1]