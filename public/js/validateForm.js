const form = document.querySelector("form");
const inputListItems = form.querySelectorAll("li");
const inputElements = form.querySelectorAll("input, textarea");
const saveButton = document.querySelector("input[type='submit']");

form.noValidate = true; // disable default html validation

function handleInputElementBlur(event) {
	event.currentTarget.value = event.currentTarget.value.trim();

	const inputListItem = event.currentTarget.closest("li");
	validateInput(inputListItem);
}

function clearError(event) {
	const inputListItem = event.currentTarget.closest("li");
	inputListItem.classList.remove("error");
}

function validateInput(inputListItem) {
	const inputElement = inputListItem.querySelector("input, textarea");

	if (inputElement.checkValidity()) clearError(inputListItem);
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
	inputElement.addEventListener("blur", handleInputElementBlur);
	inputElement.addEventListener("input", clearError);
});
saveButton.addEventListener("click", validateForm);
