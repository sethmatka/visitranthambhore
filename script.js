const form = document.querySelector("#enquiry-form");
const service = document.querySelector("#service");
const formMessage = document.querySelector("#form-message");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const whatsappNumber = "919664361536";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const formData = new FormData(form);
  const message = [
    "Hello, I would like to enquire about a trip.",
    `Name: ${formData.get("name")}`,
    `Phone: ${formData.get("phone")}`,
    `Service: ${formData.get("service")}`,
    `Travel date: ${formData.get("date") || "Not specified"}`,
    `Message: ${formData.get("message") || "None"}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const whatsappLink = document.createElement("a");

  whatsappLink.href = whatsappUrl;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noreferrer";
  whatsappLink.textContent = "Open WhatsApp";

  formMessage.replaceChildren(
    document.createTextNode("Your enquiry is ready. WhatsApp should open in a new tab; review the message and tap Send. If it does not open, "),
    whatsappLink,
    document.createTextNode("."),
  );
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.querySelectorAll("[data-service]").forEach((card) => {
  card.addEventListener("click", () => {
    service.value = card.dataset.service;
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    mainNav.classList.remove("is-open");
  });
});

document.querySelectorAll(".destination-carousel").forEach((carousel) => {
  const viewport = carousel.querySelector(".destination-window");
  const previous = carousel.querySelector('[data-direction="previous"]');
  const next = carousel.querySelector('[data-direction="next"]');

  const updateButtons = (scrollPosition = viewport.scrollLeft) => {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    previous.disabled = scrollPosition <= 1;
    next.disabled = scrollPosition >= maxScroll - 1;
  };

  const scroll = (direction) => {
    const distance = viewport.clientWidth * 0.8;
    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const target = Math.max(0, Math.min(maxScroll, viewport.scrollLeft + (direction === "next" ? distance : -distance)));
    viewport.scrollTo({
      left: target,
      behavior: "instant",
    });
    updateButtons(target);
  };

  previous.addEventListener("click", () => scroll("previous"));
  next.addEventListener("click", () => scroll("next"));
  viewport.addEventListener("scroll", updateButtons, { passive: true });
  viewport.addEventListener("scrollend", updateButtons);
  window.addEventListener("resize", updateButtons, { passive: true });
  updateButtons();
});
