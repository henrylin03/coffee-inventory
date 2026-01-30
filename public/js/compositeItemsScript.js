const selectAllCheckbox = document.querySelector("thead .checkbox");
const rowCheckboxes = document.querySelectorAll("tbody .checkbox");
const rows = document.querySelectorAll("tbody tr");

// TODO: if there is an existing item already part of category, its checkbox is checked

const handleClickOnRow = (e) => {
	const itemId = e.currentTarget.dataset.itemId;
	location.href = `/items/${itemId}`;
};

const handleChangeOnSelectAllCheckbox = () => {
	for (const checkbox of rowCheckboxes) checkbox.checked = !checkbox.checked;
};

const handleClickOnRowCheckbox = (e) => {
	e.stopPropagation();
};

// TODO: if only some of checkboxes in row is selected, then select all checkbox is 'indeterminate'

/* attach event listeners */
selectAllCheckbox.addEventListener("change", handleChangeOnSelectAllCheckbox);

for (const checkbox of rowCheckboxes)
	checkbox.addEventListener("click", handleClickOnRowCheckbox);

for (const row of rows) row.addEventListener("click", handleClickOnRow);
