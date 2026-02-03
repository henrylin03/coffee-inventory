function handleKeydownOnNumberInputs(event) {
	const bannedKeys = ["e", "E", "+", "-"];
	if (bannedKeys.includes(event.key)) {
		event.preventDefault();
	}
}

function setCancelBtnHref() {
	const QUERY_KEYS = {
		referredPageViewName: "fromPage",
		referredCategoryId: "referredCategoryId",
	};

	const cancelBtn = document.querySelector(".cancel-btn");

	const params = new URL(document.location.toString()).searchParams;
	const referredCategoryId = params.get(QUERY_KEYS.referredCategoryId);
	const referredPageViewName = params.get(QUERY_KEYS.referredPageViewName);

	if (referredCategoryId === null) {
		cancelBtn.href = "/items";
		return;
	}

	if (referredPageViewName === null || referredPageViewName === "category") {
		cancelBtn.href = `/categories/${referredCategoryId}`;
		return;
	}

	cancelBtn.href = `/categories/${referredCategoryId}/edit-items`;
}

setCancelBtnHref();
/* attach event listeners */
const form = document.querySelector("form");
const numberInputs = form.querySelectorAll('input[type="number"]');
numberInputs.forEach((input) => {
	input.addEventListener("keydown", handleKeydownOnNumberInputs);
});
