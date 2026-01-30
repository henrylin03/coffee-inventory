const selectAllCheckbox = document.querySelector("thead .checkbox");
const rowCheckboxes = document.querySelectorAll("tbody .checkbox");

// TODO: if there is an existing item already part of category, its checkbox is checked

// TODO: if user checks the 'select all' checkbox, all checkboxes are selected
const handleClickOnSelectAllCheckbox = () => {
	for (const checkbox of rowCheckboxes) checkbox.checked = true;
};

// TODO: prevent event bubbling situation with the row

// TODO: if only some of checkboxes in row is selected, then select all checkbox is 'indeterminate'

/* attach event listeners */
selectAllCheckbox.addEventListener("click", handleClickOnSelectAllCheckbox);
