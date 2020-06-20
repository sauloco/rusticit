
document.querySelector(".menu").addEventListener("click", toggleNav);
document.querySelectorAll("nav a").forEach(e=> e.addEventListener("click", toggleNav));
document.querySelector("nav img").addEventListener("click", toggleNav);

function toggleNav() {
    document.querySelector("nav").classList.toggle("hide");
}