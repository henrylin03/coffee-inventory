const selectAllCheckbox = document.querySelector("thead .checkbox");
const rowCheckboxes = document.querySelectorAll("tbody .checkbox");

// TODO: if there is an existing item already part of category, its checkbox is checked

const handleChangeOnSelectAllCheckbox = () => {
	for (const checkbox of rowCheckboxes) checkbox.checked = !checkbox.checked;
};

const handleChangeOnRowCheckbox = () => {};

// TODO: prevent event bubbling situation with the row

// TODO: if only some of checkboxes in row is selected, then select all checkbox is 'indeterminate'

/* attach event listeners */
selectAllCheckbox.addEventListener("change", handleChangeOnSelectAllCheckbox);

for (const checkbox of rowCheckboxes)
	checkbox.addEventListener("change", handleChangeOnRowCheckbox);
