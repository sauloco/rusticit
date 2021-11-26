import { setPreferredLanguage, toggleLanguage } from "./i18n";
import { toggleNav, toggleDark, handleMode } from "./toggle-functions";
import { Gradient } from "./gradients";

document.addEventListener("DOMContentLoaded", handleMode);
document.addEventListener("DOMContentLoaded", setPreferredLanguage);
document.addEventListener("DOMContentLoaded", addSmoothTransition);
document.addEventListener("DOMContentLoaded", startGradient);

document.addEventListener("mode-toggled", startGradient);

document
  .querySelectorAll(".menu, nav a")
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

function startGradient() {
  const gradient = new Gradient();
  gradient.initGradient("#gradient-canvas");
}

function addSmoothTransition() {
  document.body.classList.add("transition");
}

function goForm(event) {
  event.preventDefault();
  document.querySelector("#want_more").scrollIntoView();
}

function validateForm(data) {
  
  const nameClassList = document.querySelector("#more-input-name").classList;
  const mailClassList = document.querySelector("#more-input-mail").classList;

  nameClassList.remove("required");
  mailClassList.remove("required");
  
  const isValidPhone = !!data.mail && /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(data.mail)
  const isValidMail = !!data.mail && /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.mail)
  
  const isValidName = !!data.name;
  const isValidPhoneOraMail = isValidPhone || isValidMail;

  let result = true;
  if (!isValidName) {
    nameClassList.add("required");
    result = false;
  }
  if (!isValidPhoneOraMail) {
    mailClassList.add("required");
    result = false;
  }
  return result;
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

  const buttonElement = document.querySelector("#more-send");
  const results = document.querySelectorAll(".result");

  results.forEach((element) => element.classList.add("hide"));

  buttonElement.classList.remove('success');
  buttonElement.classList.remove('errored');

  if (response.ok) {
    const resultSuccessful = document.querySelector('.result.successful');
    buttonElement.classList.add('success');
    resultSuccessful.classList.remove('hide');
    document.querySelector("#contacto").reset();
    setTimeout(() => {
      buttonElement.classList.remove('success');
      resultSuccessful.classList.add('hide');
    }, 2000);

  } else {
    buttonElement.classList.add('errored');
    document.querySelector('.result.unsuccessful').classList.remove('hide');
    console.assert(response.status !== 200, 'Response error', response);

    setTimeout(() => {
      buttonElement.classList.remove('errored');
    }, 2000);
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
