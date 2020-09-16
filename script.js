document.addEventListener("DOMContentLoaded", handleMode);
document
  .querySelectorAll(".menu, nav a, nav img")
  .forEach((e) => e.addEventListener("click", toggleNav));
document
  .querySelector(".toggle-mode")
  .addEventListener("click", toggleDark);
document
  .querySelector(".toggle-language")
  .addEventListener("click", toggleLanguage);
document
  .querySelector("#more-send")
  .addEventListener("click", sendData);
let language = "en";

async function sendData(event) {
  event.preventDefault();
  let body = {};
  document
    .querySelectorAll("form input")
    .forEach((element) => (body[element.name] = element.value));
  
  let name = document.getElementById("more-input-name").classList;
  let mail = document.getElementById("more-input-mail").classList;
  if (!body.name && !body.mail) {
    name.add("required")
    mail.add("required")
    return 
  }else {name.remove("required"), mail.remove("required")};
  if (!body.name) {
    name.add("required");
    return 
  }else {name.remove("required")};
  if (!body.mail) {
    mail.add("required");
    return
  }else {mail.remove("required")};
  
  const response = await fetch('#', {
    method: 'POST',
    body,
  })
  if(!response.ok){
    document.getElementById("contacto").reset();
    document.getElementById("more-send").insertAdjacentElement("beforeend", document.getElementById("check"));
    let check = document.getElementById("check").style;
    check.opacity = 1;
    let interval = setInterval (hide,50);
    function hide () {
      if (check.opacity > 0){
        check.opacity -= 0.01
      } else {clearInterval(interval)}
    }
  }  
  else{
    document.getElementById("contacto").reset();
    document.getElementById("more-send").insertAdjacentElement("beforeend", document.getElementById("error"));
    let error = document.getElementById("error").style;
    error.opacity = 1;
    let interval = setInterval (hide,50);
    function hide () {
      if (error.opacity > 0){
        error.opacity -= 0.01;
      } else {clearInterval(interval)}
    };
  }
}

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
      html_en: "español",
      html_es: "english",
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
      selector: "#hero-p",
      html_en: "We will contact you",
      html_es: "Te contactaremos",
    },
    {
      selector: "#hero-input",
      html_en: "Type your mail and/or phone number here.",
      html_es: "Escribe aquí tu mail o número de teléfono.",
    },
    {
      selector: "#great-idea-t",
      html_en: "Share your <br><span>great idea</span><br> with us",
      html_es: "Hagamos realidad tu <span>gran idea</span>",
    },
    {
      selector: "#great-idea-p",
      html_en:
        `You know how much that idea worth, it has potential... if you only knew the recipe to turn it real in the ` +
        `digital world. Well, a great idea, like yours, is a great start to make a bussiness, but sadly that's not enough. ` +
        `We want to help you! We offer you all our knowledge in digital experiences, design and marketing, ` +
        `that way you will see your idea becoming real, worth the shot? Contact us`,
      html_es:
        `Tú sabes que vale mucho esa idea, que tiene potencial... si tan solo supieras dar todos los pasos necesarios para ` +
        `hacerla digital. Una buena idea es un gran puntapié para iniciar un negocio, pero lamentablemente con eso solo no alcanza. ` +
        `¡Queremos ayudarte! Para eso ponemos a tu disposición todos nuestros conocimientos en experiencias, diseño y ` +
        `marketing digital, para que puedas ir haciendo realidad tus ideas. ¡Vale la pena intentarlo! Consúltanos.`,
    },
    {
      selector: "#think-t",
      html_en: "Let us <br><span>think</span> about it",
      html_es: "Danos unos días para <br><span>pensar</span> la solución",
    },
    {
      selector: "#think-p",
      html_en:
        `As valuable as your ideas are for you, also they are for us. Then after you reach us we will set a call and ` +
        `after that we will invest our time to think what's the optimal solution for you to reach your goals. ` +
        `Sometimes will be mandatory to develop a custom solution, but sometimes we will help you through the implementation ` +
        `and adaptation of an existing digital tool. In any case we will be there to make whatever it takes. Contact us`,
      html_es:
        `Tus ideas son extremadamente valiosas, para ello contáctanos, organicemos una llamada para conocer los detalles, ` +
        `pero luego invertiremos de nuestro tiempo en pensar cuál es la solución óptima para lograr tu objetivo. ` +
        `A veces será necesario desarrollar una solución, a veces será necesario adaptar una solución ya existente, ` +
        `en cualquier caso estaremos ahí para hacer lo que haga falta. ¡Consultanos!`,
    },
    {
      selector: "#design-t",
      html_en:
        "We can <sup>and want</sup><br> <span>design</span> it and <span>code</span> it",
      html_es: "Podemos <span>diseñarla</span> y <span>programarla</span>",
    },
    {
      selector: "#design-p",
      html_en:
        `Do you have the idea and nothing more? Not an issue, we will start helping you to shape it and design it until it becomes reality. ` +
        `Do you have the design too? Great! Following that guides we can focus to bring it to the next level, adapting it ` +
        `for digital media.`,
      html_es:
        `Tienes solo la idea, no es inconveniente, comenzaremos ayudándote a diseñar todos los aspectos para convertirla en realidad. ` +
        `¿Tienes el diseño? ¡Excelente! Respetando esas guías podremos concentrarnos en llevarla al siguiente nivel, ` +
        `adaptándola a todos los medios digitales. ` +
        `En cualquier caso, ¡consúltanos!`,
    },
    {
      selector: "#mess-t",
      html_en: "We well handle all <span>the mess</span> for you",
      html_es:
        "Vamos a hacernos cargo de todo lo <span>complejo</span> por vos",
    },
    {
      selector: "#mess-p",
      html_en:
        `This idea of yours will become in a web site, mobile app, social media profiles, advertisment and coordinate posts, ` +
        `servers, security... looks overwelming? Don't worry, we want you focus in your business, not in technical details. ` +
        `We partner with the best companies, and use their best resources to bring you highly reliable services and ` +
        `availability, then your idea can grow at your own pace.`,
      html_es:
        `Esta idea se transformará en una página web, app móvil, perfiles en redes sociales, servidores, seguridad... puede ` +
        `parecer abrumador, pero nosotros queremos que te enfoques en tu negocio, no en los detalles técnicos. ` +
        `Nos asociamos con empresas que brindan servicios de alta confiabilidad y disponibilidad, para que tu idea pueda ` +
        `crecer al ritmo que necesitas. Consulta sobre este tema`,
    },
    {
      selector: "#want-more-t",
      html_en: "Do you<span> want to </span>know</span> more?",
      html_es: "Quieres</span> saber un poco <span>más",
    },
    {
      selector: "#more-input-name",
      html_en: "Type your name here",
      html_es: "Escribe tu nombre aquí",
    },
    {
      selector: "#more-input-mail",
      html_en: "Write your mail or phone here",
      html_es: "Escribe tu correo o teléfono aquí",
    },
    {
      selector: "#more-input-tell",
      html_en: "Tell us a bit about your idea",
      html_es: "Cuéntanos tu idea",
    },
    {
      selector: "#more-send",
      html_en: "Ok, send",
      html_es: "Enviar",
    },
  ];

  if (language === "en") {
    language = "es";
  } else {
    language = "en";
  }

  for (const sentence of sentences) {
    const element = document.querySelector(sentence.selector);
    const value = sentence["html_" + language];

    if (element.tagName === "INPUT") {
      element.placeholder = value;
    } else {
      element.innerHTML = value;
    }
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
