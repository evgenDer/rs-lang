import rightClick from './eventFunctions/rightArrowClick.js';
import leftClick from './eventFunctions/leftArrowClick.js';
import switchCardMode from './eventFunctions/switchCardMode.js';
import createCard from '../domBuilder/lightTree/createCard.js';

export default function createEvents(learningScreenElement) {
  learningScreenElement.addEventListener('click', () => {
    console.log(event.target);

    let item = null;
    if (event.target.closest('svg') != null) {
      item = event.target.closest('svg');
    } else if (event.target.closest('div[slot=modeButtonLeft]')) {
      item = event.target.closest('div[slot=modeButtonLeft]');
    } else if (event.target.closest('div[slot=modeButtonRight]')) {
      item = event.target.closest('div[slot=modeButtonRight]');
    }

    if (item != null) {
      switch (item.classList[0]) {
        case 'arrowSvg':
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

}
