const form = document.querySelector("#trip-form");
const experience = document.querySelector("#experience");
const season = document.querySelector("#season");
const formMessage = document.querySelector("#form-message");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const interest = experience.value.toLowerCase();
  const timing = season.value;
  const safariTip =
    experience.value === "Wildlife safari"
      ? " Reserve a safari permit through an authorized booking channel."
      : "";

  formMessage.textContent = `A good starting point: plan for ${timing}, with a focus on ${interest}.${safariTip} Check current park access and opening updates before you travel.`;
});

document.querySelectorAll(".experience-card").forEach((card) => {
  card.addEventListener("click", () => {
    experience.value = card.dataset.experience;
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
