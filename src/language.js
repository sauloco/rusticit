import sentences from "./sentences";

const supportedLanguages = ["en", "es"];
const defaultLanguage = supportedLanguages[0];
let language = defaultLanguage;

export function setPreferredLanguage() {
  const userLanguage = getUserLanguage();
  if (userLanguage !== defaultLanguage) {
    if (supportedLanguages.includes(userLanguage)) {
      toggleLanguage(); // this works because we support only 2 languages so far
    }
  }
}

function getUserLanguage() {

  const forcedLanguage = location.hash.split('#').join('');
  if (forcedLanguage) {
    if (supportedLanguages.includes(forcedLanguage)) {
      return forcedLanguage;
    } else {
      history.pushState({}, null, location.origin);
      return;
    }
  }
  
  if (window.navigator.languages) {
    return window.navigator.languages[0];
  }
  return window.navigator.userLanguage || window.navigator.language;
}

export function toggleLanguage() {
  const previousLanguage = language;
  if (language === "en") {
    language = "es";
  } else {
    language = "en";
  }

  for (const sentence of sentences) {
    const element = document.querySelector(sentence.selector);
    const value = sentence["html_" + language];

    if (element.tagName === "INPUT") {
      sentence["html_" + previousLanguage] = element.placeholder;
      element.placeholder = value;
    } else {
      sentence["html_" + previousLanguage] = element.innerHTML;
      element.innerHTML = value;
    }
  }

  document.querySelector("html").setAttribute("lang", language);
  
  const url = location.href.split(`#${previousLanguage}`).join(`#${language}`);
  
  if (url !== location.href) {
    history.pushState({}, null, url);
  }
}
