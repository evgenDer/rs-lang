/* eslint-disable no-restricted-globals */
import rightClick from './eventFunctions/rightArrowClick';
import leftClick from './eventFunctions/leftArrowClick';
import switchCardMode from './eventFunctions/switchCardMode';
import createCard from '../domBuilder/lightTree/createCard';
import openCard from './eventFunctions/openCard';
import chooseWordDifficulty from './eventFunctions/chooseWordDifficulty';
import deleteCard from './eventFunctions/deleteCard';
import addWordNeedToRepeat from './eventFunctions/addWordNeedToRepeat';
import { updateStatusBar } from '../domBuilder/lightTree/createStatusBar';
import updateDifficultyButtons from '../domBuilder/lightTree/updateDifficultyButtons';

export default function createEvents(learningScreenElement) {
  learningScreenElement.addEventListener('click', () => {
    const card = learningScreenElement.querySelector('card-word');
    let item = null;
    if (event.target.closest('img.arrow') != null) {
      item = event.target.closest('img.arrow');
    } else if (
      event.target.closest('div.clickable[slot=modeButton]') &&
      !event.target.closest('div.clickable[slot=modeButton]').classList.contains('repeating')
    ) {
      item = event.target.closest('div.clickable[slot=modeButton]');
    } else if (event.target.closest('div[slot=difficultyButton]')) {
      item = event.target.closest('div[slot=difficultyButton]');
    } else if (event.target.closest('div[slot=openWord]') != null) {
      openCard(learningScreenElement);
    } else if (event.target.closest('div[slot=deleteWord]') != null) {
      deleteCard(learningScreenElement);
    } else if (event.target.closest('div.hovered[slot=repeatWord]') != null) {
      addWordNeedToRepeat(learningScreenElement);
      event.target.classList.remove('hovered');
      event.target.classList.add('active');
    } else if (event.target.closest('.enableAudio[slot=audioHelperButton]') != null) {
    }

    if (
      event.target.closest('[slot=translateOptions]') === null &&
      event.target.closest('.translateOptionsButton') === null
    ) {
      try {
        learningScreenElement.querySelector('.translateOptionsButton').classList.remove('active');
        learningScreenElement.querySelector('[slot=translateOptions]').classList.remove('opened');
      } catch { }
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
          chooseWordDifficulty(learningScreenElement, item);
          break;
        case 'modeButton':
          const prevMode = learningScreenElement.state.mode;
          switchCardMode(learningScreenElement, item);
          const nextMode = learningScreenElement.state.mode;
          if (prevMode !== nextMode) {
            createCard(learningScreenElement);
            updateDifficultyButtons(learningScreenElement);
          }

          break;
        default:
          break;
      }
    }
  });

  document.addEventListener('keydown', () => {
    if (
      learningScreenElement.querySelector('.translateOptionsButton').classList.contains('active')
    ) {
      learningScreenElement.querySelector('.translateOptionsButton').classList.remove('active');
      learningScreenElement.querySelector('[slot=translateOptions]').classList.remove('opened');
    }
    if (event.key === 'Enter' && document.querySelector('learning-results') === null) {
      rightClick(learningScreenElement);
    }
  });

  window.addEventListener('resize', () => {
    const progressLine = learningScreenElement.querySelector('[slot=progressLine]');
    progressLine.classList.add('withoutAnimation');
    updateStatusBar(learningScreenElement);
    progressLine.classList.remove('withoutAnimation');
  });
}
