
import { putFetch, deleteContactFetch } from "./fetch-requests.js";

export default function editAndDeleteListener(evt) {

  if (evt.target && evt.target.matches('td>button.editButton')) {
    editButtonsListener(evt);
  } else if (evt.target && evt.target.matches('td.trashIcon')) {
    deleteContactFetch(evt.target.dataset.id);
  }
}

function editButtonsListener(evt) {

  let tr = evt.target.parentElement.parentElement;
  let trashbin = tr.cells[tr.cells.length - 1];
  let editCell = evt.target.parentElement;

  let { dataset } = evt.target;

  //typeof editMode is string, therefore, if  
  // editMode === "true", return true, else false.
  //stores flipped value as a bolean on "editMode." 
  let editMode = !(dataset.editMode === "true");
  dataset.editMode = editMode;

  evt.target.textContent = editMode ? 'Save' : 'Edit';
  evt.target.classList.toggle('btn-outline-primary');
  evt.target.classList.toggle('btn-success');

  tr.contentEditable = editMode;
  tr.classList.toggle('textEditable');

  trashbin.contentEditable = 'false';
  editCell.contentEditable = 'false';

  if (!editMode)
    putFetch(tr, evt.target.dataset.id);
}