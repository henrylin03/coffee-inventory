const navlinks = document.querySelectorAll(".navlink");

function styleActiveLink() {
	const ACTIVE_LINK_CLASS = "menu-active";
	const pathOfCurrentPage = window.location.pathname.split("/")[1];

	for (const linkElement of navlinks) {
		const parentElement = linkElement.parentElement;
		const navPath = linkElement.getAttribute("href").split("/")[1];
		if (navPath === pathOfCurrentPage)
			parentElement.classList.add(ACTIVE_LINK_CLASS);
		else parentElement.classList.remove(ACTIVE_LINK_CLASS);
	}
}

/* main */
styleActiveLink();
