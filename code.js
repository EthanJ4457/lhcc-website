const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
	menuToggle.addEventListener("click", function () {
		const isOpen = siteNav.classList.toggle("is-open");
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});
}

const guestSelect = document.querySelector("#guest-speaker-select");
const guestResults = document.querySelector("#guest-speaker-results");

const getVideoEmbedUrl = function (videoUrl) {
	if (!videoUrl) {
		return "";
	}

	const match = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|live\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i);
	if (match && match[1]) {
		return `https://www.youtube.com/embed/${match[1]}`;
	}

	return videoUrl;
};

const formatSpeakerName = function (fileName) {
	return decodeURIComponent(fileName)
		.replace(/\.txt$/i, "")
		.replace(/[-_]+/g, " ")
		.trim();
};

const parseVideoLine = function (line) {
	const trimmed = line.trim();
	if (!trimmed) {
		return { videoUrl: "", speakerLabel: "" };
	}

	const separatorMatch = trimmed.match(/\s[-–—]\s/);
	if (separatorMatch) {
		const splitIndex = separatorMatch.index;
		const videoUrl = trimmed.slice(0, splitIndex).trim();
		const speakerLabel = trimmed.slice(splitIndex + separatorMatch[0].length).trim();

		if (videoUrl && speakerLabel && videoUrl.startsWith("http")) {
			return {
				videoUrl,
				speakerLabel
			};
		}
	}

	return {
		videoUrl: trimmed,
		speakerLabel: ""
	};
};

const loadGuestSpeakers = async function () {
	if (!guestSelect || !guestResults) {
		return;
	}

	try {
		const directoryResponse = await fetch("Speakers/");
		if (!directoryResponse.ok) {
			throw new Error("Could not load the speaker directory");
		}

		const directoryHtml = await directoryResponse.text();
		const parser = new DOMParser();
		const doc = parser.parseFromString(directoryHtml, "text/html");
		const fileLinks = [...doc.querySelectorAll("a")]
			.map((link) => link.getAttribute("href"))
			.filter((href) => href && href.toLowerCase().endsWith(".txt"))
			.map((href) => new URL(href, directoryResponse.url).toString());

		const speakers = [];

		for (const fileUrl of fileLinks) {
			const response = await fetch(fileUrl);
			if (!response.ok) {
				continue;
			}

			const rawText = await response.text();
			const names = fileUrl.split("/").pop();
			const speakerName = formatSpeakerName(names);
			const sermonLinks = rawText
				.split(/\r?\n/)
				.map((line) => parseVideoLine(line))
				.filter((line) => line.videoUrl)
				.map((line) => ({
					title: line.speakerLabel || speakerName,
					speaker: line.speakerLabel || speakerName,
					video: getVideoEmbedUrl(line.videoUrl)
				}));

			speakers.push({
				name: speakerName,
				sermons: sermonLinks
			});
		}

		speakers.sort((a, b) => a.name.localeCompare(b.name));

		if (!speakers.length) {
			guestResults.innerHTML = '<p class="guest-speaker-empty">No guest speakers are available yet.</p>';
			return;
		}

		guestSelect.innerHTML = '<option value="">Select a speaker</option>' + speakers.map((speaker) => `
			<option value="${speaker.name}">${speaker.name}</option>
		`).join("");

		const renderSpeakerResults = function (speakerName) {
			const speaker = speakers.find((item) => item.name === speakerName);

			if (!speaker) {
				guestResults.innerHTML = '<p class="guest-speaker-empty">Please select a guest speaker.</p>';
				return;
			}

			guestResults.innerHTML = `
				<h3 class="guest-speaker-name">${speaker.name}</h3>
				<div class="guest-video-grid">
					${speaker.sermons.map((sermon) => `
						<article class="guest-video-card">
							<div class="guest-video-frame">
								<iframe src="${sermon.video}" title="${sermon.speaker} video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
							</div>
							<div class="guest-video-copy">
								<h3>${sermon.speaker}</h3>
							</div>
						</article>
					`).join("")}
				</div>
			`;
		};

		guestSelect.addEventListener("change", function () {
			renderSpeakerResults(this.value);
		});

		if (speakers[0]) {
			guestSelect.value = speakers[0].name;
			renderSpeakerResults(speakers[0].name);
		}
	} catch (error) {
		console.error("Failed to load guest speakers:", error);
		guestResults.innerHTML = '<p class="guest-speaker-empty">Guest speaker videos are unavailable right now.</p>';
	}
};

loadGuestSpeakers();

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
