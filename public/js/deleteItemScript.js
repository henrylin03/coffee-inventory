const deleteButtons = document.querySelectorAll(".delete-btn");
const deleteConfirmationModal = document.querySelector("dialog");

const showDeleteConfirmationModal = () => {
	deleteConfirmationModal.showModal();
};

// attach event listeners
[...deleteButtons].forEach((deleteBtn) => {
	deleteBtn.addEventListener("click", showDeleteConfirmationModal);
});
