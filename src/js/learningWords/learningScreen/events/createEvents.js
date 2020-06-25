/* eslint-disable no-restricted-globals */
import rightClick from './eventFunctions/rightArrowClick';
import leftClick from './eventFunctions/leftArrowClick';
import switchCardMode from './eventFunctions/switchCardMode';
import createCard from '../domBuilder/lightTree/createCard';
import openCard from './eventFunctions/openCard';
import chooseWordDifficulty from './eventFunctions/chooseWordDifficulty';
import deleteCard from './eventFunctions/deleteCard';
import restoreCard from './eventFunctions/restoreCard';
import checkAnswer from './eventFunctions/checkAnswer';
import addWordNeedToRepeat from './eventFunctions/addWordNeedToRepeat';

export default function createEvents(learningScreenElement) {
  learningScreenElement.addEventListener('click', () => {
    let item = null;
    if (event.target.closest('img.arrow') != null) {
      item = event.target.closest('img.arrow');
    } else if (event.target.closest('div[slot=modeButtonLeft]')) {
      item = event.target.closest('div[slot=modeButtonLeft]');
    } else if (event.target.closest('div[slot=modeButtonRight]')) {
      item = event.target.closest('div[slot=modeButtonRight]');
    } else if (event.target.closest('div[slot=difficultyButton]')) {
      item = event.target.closest('div[slot=difficultyButton]');
    } else if (event.target.closest('div[slot=openWord]') != null) {
      openCard(learningScreenElement);
    } else if (event.target.closest('div[slot=deleteWord]') != null) {
      deleteCard(learningScreenElement);
    } else if (event.target.closest('div[slot=restoreWord]') != null) {
      restoreCard(learningScreenElement);
    } else if (event.target.closest('div[slot=repeatWord]') != null) {
      addWordNeedToRepeat(learningScreenElement);
    }


    if (item != null) {
      switch (item.classList[0]) {
        case 'arrow':
          if (item.classList[1] === 'right') {
            rightClick(learningScreenElement);
          } else {
            leftClick(learningScreenElement);
          }
          break;
        case 'difficultyButton':
          chooseWordDifficulty(learningScreenElement, item)
          break;
        case 'modeButton':
          const prevMode = learningScreenElement.state.mode;
          switchCardMode(learningScreenElement, item);
          const nextMode = learningScreenElement.state.mode;
          if (prevMode !== nextMode) {
            createCard(learningScreenElement);
          }

          break;
        default:
          break;
      }
    }
  });

  document.addEventListener('keydown', () => {
    if (event.key === 'Enter') {
      rightClick(learningScreenElement);
    }
  });
}
