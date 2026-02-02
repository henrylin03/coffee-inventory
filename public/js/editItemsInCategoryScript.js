const selectAllCheckbox = document.querySelector("thead .checkbox");
const rowCheckboxes = document.querySelectorAll("tbody .checkbox");
const rows = document.querySelectorAll("tbody tr");

const allCheckboxesChecked = [...rowCheckboxes].every(
	(checkbox) => checkbox.checked,
);
const someCheckboxesChecked = [...rowCheckboxes].some(
	(checkbox) => checkbox.checked,
);

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

	if (someCheckboxesChecked) {
		selectAllCheckbox.indeterminate = true;
		return;
	}

	if (allCheckboxesChecked) selectAllCheckbox.checked = true;
	else selectAllCheckbox.checked = false;
	selectAllCheckbox.indeterminate = false;
};

/* MAIN */
if (someCheckboxesChecked) selectAllCheckbox.indeterminate = true;

selectAllCheckbox.addEventListener("change", handleChangeOnSelectAllCheckbox);

for (const checkbox of rowCheckboxes)
	checkbox.addEventListener("click", handleClickOnRowCheckbox);

for (const row of rows) row.addEventListener("click", handleClickOnRow);
