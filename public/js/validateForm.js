const form = document.querySelector("form");
const inputListItems = form.querySelectorAll("li");
const inputElements = form.querySelectorAll("input, textarea");
const saveButton = document.querySelector("input[type='submit']");

form.noValidate = true; // disable default html validation

function trimInput(event) {
	event.currentTarget.value = event.currentTarget.value.trim();
}

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

/* run script */
inputElements.forEach((inputElement) => {
	inputElement.addEventListener("blur", trimInput);
});
saveButton.addEventListener("click", validateForm);
