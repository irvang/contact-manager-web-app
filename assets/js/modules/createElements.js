

export default function createTableRows(sortedContactList) {
  const tableBody = document.querySelector('#contactsTable > tbody');
  tableBody.innerHTML = '';

  sortedContactList.forEach((elm) => {
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
