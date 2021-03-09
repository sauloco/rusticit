import { setPreferredLanguage, toggleLanguage } from "../i18n";
// import { toggleNav, toggleDark, handleMode } from "../script";

document.addEventListener("DOMContentLoaded", handleMode);
document.addEventListener("DOMContentLoaded", setPreferredLanguage);
document.addEventListener("DOMContentLoaded", setServiceName);
document.addEventListener("DOMContentLoaded", setStatus);
document
  .querySelectorAll(".menu, nav a")
  .forEach((e) => e.addEventListener("click", toggleNav));
document.querySelector(".toggle-mode").addEventListener("click", toggleDark);
document
  .querySelector(".toggle-language")
  .addEventListener("click", toggleLanguage);
const services = require("./services.json");

function setStatus() {
  const status = new URLSearchParams(window.location.search).get("status");
  const pThanks = document.querySelectorAll(".p-thanks-hidden");
  if (status === "approved") {
    pThanks[1].classList.toggle("p-thanks-hidden");
  } else {
    pThanks[0].classList.toggle("p-thanks-hidden");
  }
}
function setServiceName() {
  const spanServiceName = document.querySelectorAll(".service-name");
  const serviceName = new URLSearchParams(window.location.search).get("type");
  for (const service in services) {
    if (service === serviceName) {
      spanServiceName.forEach((span) => (span.innerHTML = services[service]));
      // history.pushState({}, "", "/thanks/index");
    }
  }
}

// cómo importar del script principal sin errores en consola
function toggleNav() {
  document.querySelector("nav").classList.toggle("hide");
  document.querySelector(".button-menu").classList.toggle("opened");
}

function toggleDark() {
  document.querySelector("body").classList.toggle("dark-mode");
  document.querySelector("body").classList.toggle("light-mode");
}

function handleMode() {
  if (window.matchMedia) {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    darkModeMediaQuery.addListener((e) => {
      toggleDark();
    });
    if (darkModeMediaQuery.matches) {
      document.querySelector("body").classList.toggle("dark-mode");
    } else {
      document.querySelector("body").classList.toggle("light-mode");
    }
  }
}
