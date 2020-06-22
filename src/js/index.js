import { addHeaderToPage, defineActivePage } from './navigation/index';
import addAuthorizationClickHandler from './authorization/index';
import { isNewUser } from './utils/checks';
import { initConfigurationPage } from './configuration/index';

//импорт модуля Изучения слов. Позволяет использовать хтмл элемент карточки <card-word></card-word>
import './learningWords/learningWordsPage.js';

window.onload = () => {
  addHeaderToPage();
  const activePage = defineActivePage();
  switch (activePage) {
    case 0:
      // main-page
      break;
    case 1:
      // learning-page
      break;
    case 2:
      // training-page
      break;
    case 3:
      // games-page
      break;
    case 4:
      // dictionary-page
      break;
    case 5:
      // statistics-page
      break;
    case 6:
      initConfigurationPage();
      // settings-page
      break;
    case 7:
      // promo-page
      break;
    case 8:
      // team-page
      break;
    case 9:
      // authorization-page
      window.stop();
      if (isNewUser()) {
        document.body.classList.remove('hidden');
        addAuthorizationClickHandler();
      } else {
        window.location.replace('main.html');
      }
      break;
    default:
      break;
  }
};
