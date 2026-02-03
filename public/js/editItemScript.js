function handleKeydownOnNumberInputs(event) {
	const bannedKeys = ["e", "E", "+", "-"];
	if (bannedKeys.includes(event.key)) {
		event.preventDefault();
	}
}

function setCancelBtnHref() {
	const QUERY_KEY = "referredCategoryId";
	const cancelBtn = document.querySelector(".cancel-btn");

	//   console.log("window.location.search:", location.search);
	const params = new URL(document.location.toString()).searchParams;
	const referredCategoryId = params.get(QUERY_KEY);

	if (referredCategoryId === null) {
		cancelBtn.setAttribute("href", "/items");
	} else {
		cancelBtn.setAttribute("href", `/categories/${referredCategoryId}`);
	}
	// TODO: NEED TO ALSO HANDLE SITUATION WHERE USER IS GOING TO EDIT ITEMS FROM "MANAGE ITEMS"
}

setCancelBtnHref();
/* attach event listeners */
const form = document.querySelector("form");
const numberInputs = form.querySelectorAll('input[type="number"]');
numberInputs.forEach((input) => {
	input.addEventListener("keydown", handleKeydownOnNumberInputs);
});
