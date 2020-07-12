import { addHeaderToPage, defineActivePage } from './navigation/index';
import addAuthorizationClickHandler from './authorization/index';
import { isNewUser } from './utils/checks';
import { initConfigurationPage } from './configuration/index';
import initStatistics from './statistics/index';
import { updPageContent } from './main-page/index';
import initVocabularyPage from './vocabulary/index';
//импорт модуля Изучения слов. Позволяет использовать хтмл элемент карточки <card-word></card-word>
import './learningWords/learningWordsPage';
import { getTokenTime } from './helpers/tokenHeleper';
import './promo/promoPageCreating.js';

window.onload = () => {
  addHeaderToPage();
  const activePage = defineActivePage();
  switch (activePage) {
    case 0:
      updPageContent();
      // main-page
      break;
    case 1:
      // learning-page
      break;
    case 2:
      addBtnStartEventListener();
      break;
    case 3:
      // games-page
      break;
    case 4:
      initVocabularyPage();
      // vocabulary-page
      break;
    case 5:
      initStatistics();
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
      console.log(isNewUser());
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
