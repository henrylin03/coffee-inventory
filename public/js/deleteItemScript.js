const deleteButtons = document.querySelectorAll("main .delete-btn");
const modal = document.querySelector("dialog");
const modalCancelButton = modal.querySelector(".cancel-btn");

const showDeleteConfirmationModal = () => {
	modal.showModal();
};

// attach event listeners
[...deleteButtons].forEach((deleteBtn) => {
	deleteBtn.addEventListener("click", showDeleteConfirmationModal);
});
modalCancelButton.addEventListener("click", () => modal.close());
