/* 
	Adapted from https://www.w3schools.com/howto/howto_js_filter_table.asp
*/
function filterByProperty(evt) {
	//number (0..3) that will decide which table element to sort
	let propToFilter = parseInt(document.querySelector('#propToFilter').value);

	// Declare variables 
	var input, filter, table, tr, td, i;
	input = document.getElementById("search-input");
	filter = input.value.toUpperCase();
	table = document.getElementById("contactsTable");
	tr = table.getElementsByTagName("tr");

	// Loop through all table rows, and hide those who don't match the search query
	for (i = 0; i < tr.length; i++) {
		td = tr[i].getElementsByTagName("td")[propToFilter];
		if (td) {
			if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = "";
			} else {
				tr[i].style.display = "none";
			}
		}
	}
}