import { addHeaderToPage, defineActivePage } from './navigation/index';


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
      break;
    default:
      break;
  }
};
