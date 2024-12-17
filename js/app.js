import i18next from './i18n-config.js';

let currentIndex = 0;
const slides = document.querySelectorAll('.slide-container');
const totalSlides = slides.length;

document.querySelector('.prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalSlides - 1 : currentIndex - 1;
  updateSlider();
});

document.querySelector('.next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
  updateSlider();
});

function updateSlider() {
  const offset = -currentIndex * 100;
  document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// Auto-slide
setInterval(() => {
  currentIndex = (currentIndex === totalSlides - 1) ? 0 : currentIndex + 1;
  updateSlider();
}, 3000);

const cardContainerObserver = document.getElementById('cards-container');
const cards = document.querySelectorAll('.card');

const cardsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      cards.forEach(el => {
        el.classList.add('show')
      })
      observer.unobserve(entry.target);
    } else {
      cards.forEach(el => {
        el.classList.remove('show')
      })
    }
  });
}, {
  threshold: 0.2
});

cardsObserver.observe(cardContainerObserver)

document.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".form-step");
  const progressSteps = document.querySelectorAll(".progress-step");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, idx) => {
      step.classList.toggle("active", idx === index);
      progressSteps[idx].classList.toggle("completed", idx <= index);
    });
  }

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
});

const headers = document.querySelectorAll('.anim-header');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const handleIntersection = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
};

const observer = new IntersectionObserver(handleIntersection, options);

headers.forEach(header => {
  observer.observe(header);
});


document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null,
    threshold: 0.3,
  };

  const productCards = document.querySelectorAll(".service");
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  productCards.forEach(card => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".animated-title");

  const observer = new IntersectionObserver((entries, observer) => {
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

  titles.forEach(title => observer.observe(title));
});

document.addEventListener("DOMContentLoaded", () => {
  const animatedBlocks = document.querySelectorAll(".primary-square");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedBlocks.forEach((block) => observer.observe(block));
});

export function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = i18next.t(element.getAttribute('data-i18n'));
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    element.setAttribute('placeholder', i18next.t(element.getAttribute('data-i18n-placeholder')));
  });
}
const button = document.getElementById('language-switch');

const handleLanguageSwitch = (e) => {
  e.stopPropagation()
  const newLang = i18next.language === 'en' ? 'es' : 'en';
  i18next.changeLanguage(newLang, updateContent).then(() => {
    button.textContent = newLang.toUpperCase();
  });
};

button.removeEventListener('click', handleLanguageSwitch);
button.addEventListener('click', handleLanguageSwitch);
