import i18next from "./i18n-config.js";

export function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = i18next.t(element.getAttribute('data-i18n'));
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    element.setAttribute('placeholder', i18next.t(element.getAttribute('data-i18n-placeholder')));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Слайдер
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide-container');
  const totalSlides = slides.length;

  const updateSlider = () => {
    const offset = -currentIndex * 100;
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
  };

  document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
    updateSlider();
  });

  document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateSlider();
  });

  // Auto-slide
  setInterval(() => {
    currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
    updateSlider();
  }, 3000);

  // Анимация карточек
  const cardsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.card').forEach(card => card.classList.add('show'));
        observer.unobserve(entry.target);
      } else {
        document.querySelectorAll('.card').forEach(card => card.classList.remove('show'));
      }
    });
  }, { threshold: 0.2 });

  const cardContainerObserver = document.getElementById('cards-container');
  if (cardContainerObserver) {
    cardsObserver.observe(cardContainerObserver);
  }

  const ctaButton = document.querySelector(".animated-button");

  const ctaButtonObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        ctaButton.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  ctaButtonObserver.observe(ctaButton);

  // Шаги формы
  const steps = document.querySelectorAll(".form-step");
  const progressSteps = document.querySelectorAll(".progress-step");
  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, idx) => {
      step.classList.toggle("active", idx === index);
      progressSteps[idx].classList.toggle("completed", idx <= index);
    });
  };

  document.querySelectorAll(".next-step").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  document.querySelectorAll(".prev-step").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  showStep(currentStep);

  // Анимация заголовков
  const headers = document.querySelectorAll('.anim-header');
  const headerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  headers.forEach(header => headerObserver.observe(header));

  // Анимация товаров
  const serviceObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.service').forEach(service => service.classList.add('animate'));
        observer.unobserve(entry.target);
      } else {
        document.querySelectorAll('.service').forEach(service => service.classList.remove('animate'));
      }
    });
  }, { threshold: 0.2 });

  const serviceContainerObserver = document.getElementById('services');
  if (serviceContainerObserver) {
    serviceObserver.observe(serviceContainerObserver);
  }

  // Анимация заголовков с span
  const titles = document.querySelectorAll(".animated-title");
  const titleObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const spans = entry.target.querySelectorAll("span");
        spans.forEach((span, index) => {
          span.style.transitionDelay = `${index * 0.2}s`;
        });
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  titles.forEach(title => titleObserver.observe(title));

  // Анимация primary-square
  const animatedBlocks = document.querySelectorAll(".primary-square");
  const blockObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        blockObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedBlocks.forEach((block) => blockObserver.observe(block));

  // Переключение языка
  const button = document.getElementById('language-switch');
  const buttonTitle = document.getElementById('language-switch-text');
  const handleLanguageSwitch = () => {
    const newLang = i18next.language === 'en' ? 'es' : 'en';
    i18next.changeLanguage(newLang, updateContent).then(() => {
      buttonTitle.textContent = newLang.toUpperCase();
    });
  };

  button.addEventListener('click', handleLanguageSwitch);

  // Dropdown
  const dropdown = document.querySelector(".dropdown");
  const dropdownButton = dropdown?.querySelector(".dropdown-button");

  if (dropdownButton) {
    dropdownButton.addEventListener("click", (e) => {
      e.preventDefault();
      dropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
      }
    });
  }

  const checkboxes = dropdown?.querySelectorAll('input[type="checkbox"]');
  checkboxes?.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const selectedServices = Array.from(checkboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.value);
      console.log("Выбранные услуги:", selectedServices);
    });
  });
}, { once: true });

const burgerMenu = document.getElementById('burger-menu');
const navigation = document.getElementById('nav');
const body = document.body;

burgerMenu.addEventListener('click', function () {
  navigation.classList.toggle('open');
  burgerMenu.classList.toggle('open');

  if (burgerMenu.classList.contains('open')) {
    body.classList.add('disable-scroll');
  } else {
    body.classList.remove('disable-scroll');
  }
});

const menuLinks = document.querySelectorAll('.menu-link');
menuLinks.forEach(link => {
  link.addEventListener('click', function () {
    navigation.classList.remove('open');
    burgerMenu.classList.remove('open');
    body.classList.remove('disable-scroll');
  });
});
