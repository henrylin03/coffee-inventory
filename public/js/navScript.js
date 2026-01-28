const navlinks = document.querySelectorAll(".navlink");

function styleActiveLink() {
	const ACTIVE_LINK_CLASS = "menu-active";
	const pathOfCurrentPage = window.location.pathname.split("/")[1];

	[...navlinks].forEach((elem) => {
		const linkPath = elem.getAttribute("href").split("/")[1];
		console.log(linkPath);

		if (linkPath === pathOfCurrentPage) elem.classList.add(ACTIVE_LINK_CLASS);
		else elem.classList.remove(ACTIVE_LINK_CLASS);
	});
}

/* main */
styleActiveLink();
