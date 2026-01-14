const form = document.querySelector("form");
const inputListItems = form.querySelectorAll("li");
const saveButton = document.querySelector("input[type='submit']");

form.noValidate = true; // disable default html validation

function validateInput(inputListItem) {
	const inputElement = inputListItem.querySelector("input, textarea");

	if (inputElement.checkValidity()) inputListItem.classList.remove("error");
	else inputListItem.classList.add("error");
}

function validateForm(event) {
	if (form.checkValidity()) form.submit();

	event.preventDefault();
	inputListItems.forEach((inputListItem) => {
		validateInput(inputListItem);
	});
}

saveButton.addEventListener("click", validateForm);
