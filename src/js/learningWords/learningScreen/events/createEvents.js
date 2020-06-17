import rightClick from './eventFunctions/rightArrowClick.js';
import leftClick from './eventFunctions/leftArrowClick.js';

export default function createEvents(learningScreenElement) {
  learningScreenElement.addEventListener('click', () => {
    console.log(event.target);

    let item = null;
    if (event.target.closest('svg') != null) {
      item = event.target.closest('svg');
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
      }
    }
  })

}
