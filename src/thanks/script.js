import { setPreferredLanguage, toggleLanguage } from "../i18n";
import { toggleNav, toggleDark, handleMode } from "../toggle-functions";

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
  const pThanks = document.querySelectorAll("#thanks p");
  if (status === "approved") {
    pThanks[1].classList.toggle("hide");
  } else {
    pThanks[0].classList.toggle("hide");
  }
}
function setServiceName() {
  const spanServiceName = document.querySelectorAll(".service-name");
  const serviceName = new URLSearchParams(window.location.search).get("type");
  for (const service in services) {
    if (service === serviceName) {
      spanServiceName.forEach((span) => (span.innerHTML = services[service]));
      history.pushState({}, "", "/thanks/index");
    }
  }
}
