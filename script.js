document.addEventListener("DOMContentLoaded", handleMode);
document
  .querySelectorAll(".menu, nav a, nav img")
  .forEach((e) => e.addEventListener("click", toggleNav));
document.querySelector(".toggle-mode").addEventListener("click", toggleDark);
//document.querySelector("toggle-language").addEventListener("click", toggleLanguage)

function toggleNav() {
  document.querySelector("nav").classList.toggle("hide");
}

function toggleDark() {
  document.querySelector("body").classList.toggle("dark-mode");
  document.querySelector("body").classList.toggle("light-mode");
}

function toggleLanguage() {
  const sentences = [
    {
      selector: "#menu-idea",
      html_en: "great idea",
      html_es: "gran idea",
    },
    {
      selector: "#menu-think",
      html_en: "think",
      html_es: "pensar",
    },
    {
      selector: "#menu-design",
      html_en: "design and code",
      html_es: "diseñar y programar",
    },
    {
      selector: "#menu-mess",
      html_en: "the mess",
      html_es: "complejo",
    },
    {
      selector: "#menu-more",
      html_en: "want more?",
      html_es: "quieres más",
    },
    {
      selector: "#menu-language",
      html_en: "english",
      html_es: "español",
    },
    {
      selector: "#menu-dark",
      html_en: "dark",
      html_es: "oscuro",
    },
    {
      selector: "#menu-light",
      html_en: "light",
      html_es: "claro",
    },
    {
      selector: "#hero-one",
      html_en: "We build robust yet modern digital experiences",
      html_es:
        "Construimos experiencias digitales robustas, seguras y modernas",
    },
    {
      selector: "#hero-two",
      html_en: "Software for mobile and web.",
      html_es: "Desarrollo web y móvil en Javascript.",
    },
    {
      selector: "#hero-three",
      html_en: "Designing, consulting and development.",
      html_es: "Consultoría y creación de soluciones.",
    },
    {
      selector: "#great-idea-t",
      html_en: "Share your <br><span>great idea</span><br> with us",
      html_es: "Hagamos realidad tu <span>gran idea</span>",
    },
    {
      selector: "#grat-idea-p",
      html_en: "",
      html_es: "",
    },
    {
      selector: "#think-t",
      html_en: "Let us <br><span>think</span> about it",
      html_es: "",
    },
    {
      selector: "#think-p",
      html_en: "",
      html_es: "",
    },
    {
      selector: "#design-t",
      html_en: "We can <sup>and want</sup><br> <span>design</span> it and <span>code</span> it",
      html_es: "Podemos <span>diseñarla</span> y <span>programarla</span>",
    },
    {
      selector: "#design-p",
      html_en: "",
      html_es: "",
    },
    {
      selector: "#mess-t",
      html_en: "We well handle all <span>the mess</span> for you",
      html_es: "Vamos a hacernos cargo de todo lo <span>complejo</span> por vos",
    },
    {
      selector: "#mess-p",
      html_en: "",
      html_es: "",
    },
    {
      selector: "#want-more-t",
      html_en: "Do you<span> want to </span>know</span> more?",
      html_es: "Quieres</span> saber un poco <span>más",
    },
    {
      selector: "",
      html_en: "",
      html_es: "",
    },
  ];

  for (const sentence of sentences) {
    document.querySelector(sentence.selector).innerHTML(sentence.html);
  }
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
      toggleDark();
    }
  }
}
