
document.querySelectorAll(".menu, nav a, nav img").forEach(e=> e.addEventListener ("click", toggleNav));
document.querySelector(".toggle-mode").addEventListener("click", toggleDark);

function toggleNav() {
    document.querySelector("nav").classList.toggle("hide");
}

function toggleDark() {
    document.querySelector("body").classList.toggle("dark-mode");
    document.querySelector("body").classList.toggle("light-mode");
}

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addListener((e) => {
  const darkModeOn = e.matches;
  console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`, darkModeOn);
  toggleDark()
});
console.log(darkModeMediaQuery)