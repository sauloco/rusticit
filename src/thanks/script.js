import { setPreferredLanguage, toggleLanguage } from "../i18n";
import { toggleNav, toggleDark, handleMode } from "../script";
document.addEventListener("DOMContentLoaded", handleMode);
document.addEventListener("DOMContentLoaded", setPreferredLanguage);
document
  .querySelectorAll(".menu, nav a, nav img")
  .forEach((e) => e.addEventListener("click", toggleNav));
document.querySelector(".toggle-mode").addEventListener("click", toggleDark);
document
  .querySelector(".toggle-language")
  .addEventListener("click", toggleLanguage);
