import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import {updateContent} from "./app.js";

i18next
  .use(Backend)
  .init({
    // lng: 'en',
    fallbackLng: 'en',
    backend: {
      loadPath: 'locales/{{lng}}.json'
    },
    interpolation: {
      escapeValue: false
    },
  }, function (err, t) {
    if (err) return console.error(err);
    updateContent();
  });

export default i18next;
