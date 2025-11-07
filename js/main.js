const btnHamburger = document.getElementById("btnHamburger");
const navMenu = document.getElementById("navMenu");

btnHamburger.addEventListener("click", () => {
  navMenu.classList.toggle("menu-open");
  btnHamburger.classList.toggle("menu-open");
});

const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("menu-open");
    btnHamburger.classList.remove("menu-open");
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

hiddenElements.forEach((el) => observer.observe(el));

const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const form = document.querySelector(".contact__form");
const formStatusMessage = document.getElementById("formStatusMessage");

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.querySelector('input[name="Nome"]').value.trim();
  const email = form.querySelector('input[name="Email"]').value.trim();
  const message = form.querySelector('textarea[name="Mensagem"]').value.trim();

  if (!name || !email || !message) {
    formStatusMessage.textContent =
      "⚠️ Por favor, preencha todos os campos obrigatórios.";
    formStatusMessage.classList.add("show");
    setTimeout(() => {
      formStatusMessage.classList.remove("show");
    }, 3000);
    return;
  }

  if (!isValidEmail(email)) {
    formStatusMessage.textContent =
      "⚠️ Por favor, insira um endereço de e-mail válido.";
    formStatusMessage.classList.add("show");
    setTimeout(() => {
      formStatusMessage.classList.remove("show");
    }, 3000);
    return;
  }

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formStatusMessage.textContent =
        "✅ Mensagem enviada com sucesso! Em breve, entrarei em contato.";
      formStatusMessage.classList.add("show");
      form.reset();

      setTimeout(() => {
        formStatusMessage.classList.remove("show");
      }, 5000);
    } else {
      formStatusMessage.textContent =
        "❌ Ocorreu um erro ao enviar a mensagem. Tente novamente.";
      formStatusMessage.classList.add("show");
    }
  } catch (error) {
    formStatusMessage.textContent = "❌ Erro de conexão. Verifique sua rede.";
    formStatusMessage.classList.add("show");
  }
});
