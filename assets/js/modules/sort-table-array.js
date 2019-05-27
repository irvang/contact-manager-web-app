
import { globalContactList } from "./fetch-requests.js";
import createTableRows from "./createElements.js";


let checkRepeat = '';
let sortDirection = -1;

export { resetCheckRepeat };

export default function sortTableArray(evt) {

	let prop = evt.target.dataset.name;
	let n = parseInt(evt.target.dataset.cellIndex);

	let sortedContactList = [];
	if (prop === 'birthday') {
		sortedContactList = globalContactList.sort(sortDate(prop, n));
	} else {
		sortedContactList = globalContactList.sort(sortString(prop, n));
	}

	createTableRows(sortedContactList);
}

//---------------------------
function sortString(prop, n) {
	/* if repeating property, invert sortDirection; if not, 
	set to 1 so that order is ascending */
	sortDirection = checkRepeat === prop ? -sortDirection : 1;
	checkRepeat = prop;

	arrowDirection(sortDirection, n);

	return function (a, b) {
		let aProp = a[prop].toUpperCase();
		let bProp = b[prop].toUpperCase();
		return aProp > bProp ? sortDirection : -sortDirection;
	}
}

function sortDate(prop, n) {
	/* if repeating property, invert sortDirection; if not, 
set to 1 so that order is ascending */
	sortDirection = checkRepeat === prop ? -sortDirection : 1;
	checkRepeat = prop;

	arrowDirection(sortDirection, n);

	return function (a, b) {
		let aProp = new Date(a[prop]);
		let bProp = new Date(b[prop]);
		return aProp > bProp ? -sortDirection : sortDirection;
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
		i === n ? elm.innerHTML = arrowDir : elm.innerHTML = '&nbsp;&nbsp;';
	});
}

// By setting checkRepeat to empty string the function ensures that all 
// calls to get reset sort order to ascending by name
function resetCheckRepeat() {
	checkRepeat = '';
}

// console.log(tbody.rows[10].cells[1]);
// tbody.rows[10].cells[1]