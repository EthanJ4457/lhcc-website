const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", function () {
		const isOpen = siteNav.classList.toggle("is-open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});
}
