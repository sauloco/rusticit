import { setPreferredLanguage, toggleLanguage } from "./i18n";

document.addEventListener("DOMContentLoaded", handleMode);
document.addEventListener("DOMContentLoaded", setPreferredLanguage);
document.addEventListener("DOMContentLoaded", addSmoothTransition);

document
  .querySelectorAll(".menu, nav a, nav img")
  .forEach((e) => e.addEventListener("click", toggleNav));
document.querySelector(".toggle-mode").addEventListener("click", toggleDark);
document
  .querySelector(".toggle-language")
  .addEventListener("click", toggleLanguage);

document.querySelector("#more-send").addEventListener("click", sendData);
document.querySelector("#hero-submit").addEventListener("click", goForm);

let heroInput = document.querySelector("#hero-input");
let formInput = document.querySelector("#more-input-mail");
heroInput.addEventListener("input", function () {
  formInput.value = heroInput.value;
});

function addSmoothTransition() {
  document.body.classList.add('transition');
}

function goForm(event) {
  event.preventDefault();
  document.querySelector("#want_more").scrollIntoView();
}

function validateForm(data) {
  let nameClassList = document.querySelector("#more-input-name").classList;
  let mailClassList = document.querySelector("#more-input-mail").classList;

  nameClassList.remove("required");
  mailClassList.remove("required");

  if (!data.name || !data.mail) {
    if (!data.name) {
      nameClassList.add("required");
    }
    if (!data.mail) {
      mailClassList.add("required");
    }
    return false;
  }
  return true;
}

async function sendData(event) {
  event.preventDefault();
  let validator = {};
  document
    .querySelectorAll("#contacto input")
    .forEach((element) => (validator[element.name] = element.value));

  if (!validateForm(validator)) {
    return;
  }

  const body = parseBody(validator);

  const response = await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  validateResponse(response);
}

function validateResponse(response) {
  let checkElement = document.querySelector(".check");
  let errorElement = document.querySelector(".error");

  const fadeIconClassName = "show-hide-symbol";

  checkElement.classList.remove(fadeIconClassName);
  errorElement.classList.remove(fadeIconClassName);
  void errorElement.offsetWidth;
  
  if (response.ok) {
    document.querySelector("#contacto").reset();
    checkElement.classList.add(fadeIconClassName);
  } else {
    errorElement.classList.add(fadeIconClassName);
  }
}

function parseBody(validator) {
  let body = "";
  for (const [key, value] of Object.entries(validator)) {
    body += `${key}=${encodeURIComponent(value)}&`;
  }
  body += "form-name=contact";
  return body;
}

function toggleNav() {
  document.querySelector("nav").classList.toggle("hide");
  document
    .querySelectorAll(".button-menu")
    .forEach((b) => b.classList.toggle("opened"));
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
