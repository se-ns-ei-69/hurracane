import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import {updateContent} from "./app.js";

i18next
  .use(Backend)
  .init({
    // lng: 'en',
    fallbackLng: 'en',
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    interpolation: {
      escapeValue: false
    },
  }, function (err, t) {
    if (err) return console.error(err);
    updateContent();
  });

export default i18next;


// function updateContent() {
//   document.querySelectorAll('[data-i18n]').forEach(element => {
//     element.textContent = i18next.t(element.getAttribute('data-i18n'));
//   });
//
//   document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
//     element.setAttribute('placeholder', i18next.t(element.getAttribute('data-i18n-placeholder')));
//   });
// }
//
// document.getElementById('language-switch').addEventListener('click', () => {
//   console.log('i18next.language', i18next.language);
//   const newLang = i18next.language === 'en' ? 'es' : 'en';
//   i18next.changeLanguage(newLang, updateContent);
//   document.getElementById('language-switch').textContent = newLang.toUpperCase();
// });
