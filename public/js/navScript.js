const navbarElement = document.querySelector("#nav");
const anchorElements = navbarElement.querySelectorAll(".links>li>a");

function styleActiveLink() {
	const currentPath = window.location.pathname.split("/")[1];

	[...anchorElements].forEach((anchor) => {
		const anchorPath = anchor.getAttribute("href").split("/")[1];

		if (anchorPath === currentPath) anchor.classList.add("active");
		else anchor.classList.remove("active");
	});
}

/* main */
styleActiveLink();
