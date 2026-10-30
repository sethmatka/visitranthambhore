const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const contacts = document.querySelector(".floating-contacts");
const contactsToggle = document.querySelector(".floating-contact-toggle");
const contactList = document.querySelector(".floating-contact-list");

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

const setContactsOpen = (isOpen) => {
  contacts.classList.toggle("is-open", isOpen);
  contactsToggle.setAttribute("aria-expanded", String(isOpen));
  contactsToggle.setAttribute("aria-label", isOpen ? "Close contact links" : "Open contact links");
  contactList.setAttribute("aria-hidden", String(!isOpen));
  contactList.inert = !isOpen;
};

contactsToggle.addEventListener("click", () => {
  setContactsOpen(contactsToggle.getAttribute("aria-expanded") !== "true");
});

contacts.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactsToggle.getAttribute("aria-expanded") === "true") {
    setContactsOpen(false);
    contactsToggle.focus();
  }
});

contactList.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setContactsOpen(false));
});

document.querySelectorAll('a[href="#plan"], a[href="#enquiry-form"]').forEach((link) => {
  const service = link.dataset.service;
  const message = service
    ? `Hello, I would like to enquire about ${service}.`
    : "Hello, I would like to enquire about your travel services.";

  link.href = `https://wa.me/919785364401?text=${encodeURIComponent(message)}`;
  link.target = "_blank";
  link.rel = "noreferrer";
});
