function handleKeydownOnNumberInputs(event) {
    const bannedKeys = ["e", "E", "+", "-"];
    if (bannedKeys.includes(event.key)) {
        event.preventDefault();
    }
}

/* attach event listeners */
const form = document.querySelector("form");
const numberInputs = form.querySelectorAll('input[type="number"]');
numberInputs.forEach((input) => {
    input.addEventListener("keydown", handleKeydownOnNumberInputs);
});
