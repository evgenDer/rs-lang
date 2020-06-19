import rightClick from './eventFunctions/rightArrowClick.js';
import leftClick from './eventFunctions/leftArrowClick.js';
import switchCardMode from './eventFunctions/switchCardMode.js';
import createCard from '../domBuilder/lightTree/createCard.js';
import openCard from './eventFunctions/openCard.js';
import hardCard from './eventFunctions/hardCard.js';
import deleteCard from './eventFunctions/deleteCard.js';
import restoreCard from './eventFunctions/restoreCard.js';

export default function createEvents(learningScreenElement) {
  learningScreenElement.addEventListener('click', () => {
    console.log(event.target);

    let item = null;
    if (event.target.closest('img.arrow') != null) {
      item = event.target.closest('img.arrow');
    } else if (event.target.closest('div[slot=modeButtonLeft]')) {
      item = event.target.closest('div[slot=modeButtonLeft]');
    } else if (event.target.closest('div[slot=modeButtonRight]')) {
      item = event.target.closest('div[slot=modeButtonRight]');
    } else if (event.target.closest('div[slot=openWord]') != null) {
      openCard(learningScreenElement);
    } else if (event.target.closest('div[slot=deleteWord]') != null) {
      deleteCard(learningScreenElement);
    } else if (event.target.closest('div[slot=hardWord]') != null) {
      hardCard(learningScreenElement);
    } else if (event.target.closest('div[slot=restoreWord]') != null) {
      restoreCard(learningScreenElement);
    }

    if (item != null) {
      switch (item.classList[0]) {
        case 'arrow':
          if (item.classList[1] == 'right') {
            rightClick(learningScreenElement);
          } else {
            leftClick(learningScreenElement)
          }
          break;

        case 'modeButton':
          switchCardMode(learningScreenElement, item);
          createCard(learningScreenElement);
          break;
      }
    }
  })

  document.addEventListener('keydown', () => {
    if (event.key == "Enter") {
      rightClick(learningScreenElement);
    } else if (event.key == 'Backspace') {
      leftClick(learningScreenElement);
    }
  })
}
