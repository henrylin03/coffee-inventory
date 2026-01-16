const navbarElement = document.querySelector("#nav");
const anchorElements = navbarElement.querySelectorAll(".links>li>a");

function styleActiveLink() {
	const currentPath = window.location.pathname.split("/")[1];

	[...anchorElements].forEach((anchor) => {
		const anchorPath = anchor.getAttribute("href").split("/")[1];
		const anchorContainer = anchor.parentElement;

		if (anchorPath === currentPath) anchorContainer.classList.add("active");
		else anchorContainer.classList.remove("active");
	});
}

/* main */
styleActiveLink();
