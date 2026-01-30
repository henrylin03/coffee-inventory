const selectAllCheckbox = document.querySelector("thead .checkbox");
const rowCheckboxes = document.querySelectorAll("tbody .checkbox");
const rows = document.querySelectorAll("tbody tr");

// TODO: if there is an existing item already part of category, its checkbox is checked

const handleClickOnRow = (e) => {
	const itemId = e.currentTarget.dataset.itemId;
	location.href = `/items/${itemId}`;
};

const handleChangeOnSelectAllCheckbox = (e) => {
	const selectAll = e.currentTarget;

	for (const checkbox of rowCheckboxes) {
		if (!selectAll.checked) checkbox.checked = false;
		else checkbox.checked = true;
	}
};

const handleClickOnRowCheckbox = (e) => {
	e.stopPropagation();

	const allCheckboxesChecked = [...rowCheckboxes].every(
		(checkbox) => checkbox.checked,
	);
	const noCheckboxesChecked = [...rowCheckboxes].every(
		(checkbox) => checkbox.checked === false,
	);

	if (!allCheckboxesChecked && !noCheckboxesChecked) {
		selectAllCheckbox.indeterminate = true;
		return;
	}

	if (allCheckboxesChecked) selectAllCheckbox.checked = true;
	else selectAllCheckbox.checked = false;
	selectAllCheckbox.indeterminate = false;
};

/* attach event listeners */
selectAllCheckbox.addEventListener("change", handleChangeOnSelectAllCheckbox);

for (const checkbox of rowCheckboxes)
	checkbox.addEventListener("click", handleClickOnRowCheckbox);

for (const row of rows) row.addEventListener("click", handleClickOnRow);
