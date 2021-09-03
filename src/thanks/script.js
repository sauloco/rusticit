import { setPreferredLanguage, toggleLanguage, getLanguage } from "../i18n";
import { toggleNav, toggleDark, handleMode } from "../toggle-functions";
import services from "./services.json";

const serviceName = new URLSearchParams(window.location.search).get("type");
const status = new URLSearchParams(window.location.search).get("status");
history.pushState({}, "", "/thanks");

document.addEventListener("DOMContentLoaded", handleMode);
document.addEventListener("DOMContentLoaded", setPreferredLanguage);
document.addEventListener("DOMContentLoaded", setStatus);
document.addEventListener("DOMContentLoaded", setServiceName);
document
  .querySelectorAll(".menu, nav a")
  .forEach((e) => e.addEventListener("click", toggleNav));
document.querySelector(".toggle-mode").addEventListener("click", toggleDark);
document
  .querySelector(".toggle-language")
  .addEventListener("click", () => {
    toggleLanguage(); 
    onLanguageChange();
  });

function setStatus() {
  const pThanks = document.querySelectorAll("#thanks p");
  if (status === "approved") {
    pThanks[1].classList.toggle("hide");
  } else {
    pThanks[0].classList.toggle("hide");
  }
}
function setServiceName() {
  const spanServiceName = document.querySelectorAll(".service-name");
  
  const serviceDescription = services[serviceName];

  const serviceDescriptionLanguage = serviceDescription[getLanguage()];
  spanServiceName.forEach((span) => (span.innerHTML = serviceDescriptionLanguage));
  
}

function onLanguageChange() {
  setServiceName();
}
