import { getFetch, postFetch } from "./fetch-requests.js";
import sortTableArray from "./sort-table-array.js";
import filterByProperty from './filter-by-property.js';

import editAndDeleteListener from './editAndDeleteListener.js'

//using only for its effect     
let sideEffect;
export default sideEffect;

//POST BUTTON
document.querySelector('#post-btn').addEventListener('click', postFetch);

//====GET BUTTON - really useless, function triggered automatically
document.querySelector('#get').addEventListener('click', getFetch);

document.querySelector('#search-input')
	.addEventListener('keyup', filterByProperty);

//====EDIT AND DELETE
document.querySelector('#contactsTable')
	.addEventListener('click', editAndDeleteListener);

//====ARRAY-TABLE-SORTING
document.querySelector('#th-firstName')
	.addEventListener('click', sortTableArray);


document.querySelector('#th-lastName')
	.addEventListener('click', sortTableArray);

document.querySelector('#th-phone')
	.addEventListener('click', sortTableArray);

document.querySelector('#th-email')
	.addEventListener('click', sortTableArray);

document.querySelector('#th-dob')
	.addEventListener('click', sortTableArray);

document.querySelector('#th-notes')
	.addEventListener('click', sortTableArray);

