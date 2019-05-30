/* 
	Adapted from https://www.w3schools.com/howto/howto_js_filter_table.asp
*/

export default function filterByProperty(evt) {
	//number (0..3) that will decide which td to sort
	//select#propToFilter > option
	let propToFilter = parseInt(document.querySelector('#propToFilter').value);

	// Declare variables 
	let input = document.getElementById("search-input");
	let filter = input.value.toUpperCase();
	let table = document.getElementById("contactsTable");//selecting table
	// let table = document.querySelector("#contactsTable>tbody");//selecting tbody
	let tr = table.getElementsByTagName("tr"); // HTML collection, all rows


	// Loop through all table rows, and hide those that don't match the search query
	for (let i = 0; i < tr.length; i++) {

		// select specific td from tr (not from document), and apply filter to it
		// using td ensures we do not hide thead. We could also only select tbody instead
		let td = tr[i].getElementsByTagName("td")[propToFilter];

		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].classList.remove('displayNone'); // tr[i].style.display = "";
			} else {
				tr[i].classList.add('displayNone'); // tr[i].style.display = "none";
			}
		}
	}
}