const nav = document.querySelector("#nav");
const navlinkWrappers = nav.querySelectorAll(".navlink-wrapper");

function styleActiveLink() {
	const pathOfCurrentPage = window.location.pathname.split("/")[1];

	[...navlinkWrappers].forEach((navlinkWrapperElement) => {
		const navlinkAnchorElement =
			navlinkWrapperElement.querySelector(".navlink");
		const navlinkPath = navlinkAnchorElement.getAttribute("href").split("/")[1];

		if (navlinkPath === pathOfCurrentPage)
			navlinkWrapperElement.classList.add("active");
		else navlinkAnchorElement.classList.remove("active");
	});
}

/* main */
styleActiveLink();
