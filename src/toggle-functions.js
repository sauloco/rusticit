function toggleNav() {
  document.querySelector("nav").classList.toggle("hide");
  document.querySelector(".button-menu").classList.toggle("opened");
}

function toggleDark() {
  document.querySelector("body").classList.toggle("dark-mode");
  document.querySelector("body").classList.toggle("light-mode");
  const event = new CustomEvent("mode-toggled");
  document.dispatchEvent(event);
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

export { toggleNav, toggleDark, handleMode };
