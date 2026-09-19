const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", function () {
		const isOpen = siteNav.classList.toggle("is-open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});
}

const contactForm = document.querySelector(".connect-form");

if (contactForm) {
	const emailInput = contactForm.querySelector('input[name="email"]');

	if (emailInput) {
		emailInput.setAttribute("type", "email");
		emailInput.setAttribute("inputmode", "email");
	}

	contactForm.addEventListener("submit", function (event) {
		event.preventDefault();

		const formData = new FormData(contactForm);
		const name = (formData.get("name") || "").toString().trim();
		const email = (formData.get("email") || "").toString().trim();
		const subject = (formData.get("subject") || "").toString().trim();
		const message = (formData.get("message") || "").toString().trim();

		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			emailInput?.focus();
			emailInput?.reportValidity();
			return;
		}

		const body = [
			"Name: " + name,
			"Email: " + email,
			"",
			message
		].join("\n");
// lhcc.pastormarkj@gmail.com
		const mailtoLink = `mailto:ethanj4457@gmail.com?subject=${encodeURIComponent(subject || "Website message")}&body=${encodeURIComponent(body)}`;
		window.location.href = mailtoLink;
	});
}
