//post button
document.querySelector('#post-btn').addEventListener('click', postFetch);

//get button
document.querySelector('#get').addEventListener('click', getFetch);

document.querySelector('#search-input').addEventListener('keyup', filterByProperty);

//table sorting
document.querySelector('#th-firstName').addEventListener('click', sortTable(0));
document.querySelector('#th-lastName').addEventListener('click', sortTable(1));
document.querySelector('#th-phone').addEventListener('click', sortTable(2));
document.querySelector('#th-email').addEventListener('click', sortTable(3));
document.querySelector('#th-dob').addEventListener('click', sortTableDate(4));
document.querySelector('#th-notes').addEventListener('click', sortTable(5));