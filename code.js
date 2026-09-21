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

	contactForm.addEventListener("submit", async function (event) {
		event.preventDefault();

		const emailValue = (emailInput?.value || "").trim();

		if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
			emailInput?.focus();
			emailInput?.reportValidity();
			return;
		}

		const formData = new FormData(contactForm);

		try {
			const response = await fetch(contactForm.action, {
				method: "POST",
				body: formData,
				headers: {
					Accept: "application/json"
				}
			});

			if (!response.ok) {
				throw new Error("Form submission failed");
			}

			contactForm.reset();

			let status = contactForm.parentElement.querySelector(".form-status");
			if (!status) {
				status = document.createElement("p");
				status.className = "form-status success";
				contactForm.insertAdjacentElement("afterend", status);
			} else {
				status.className = "form-status success";
			}

			status.textContent = "Thanks for your message! We’ll be in touch soon.";
		} catch (error) {
			console.error("Form submission failed:", error);

			let status = contactForm.parentElement.querySelector(".form-status");
			if (!status) {
				status = document.createElement("p");
				status.className = "form-status error";
				contactForm.insertAdjacentElement("afterend", status);
			} else {
				status.className = "form-status error";
			}

			status.textContent = "Something went wrong. Please email us directly instead.";
		}
	});
}
