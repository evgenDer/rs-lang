import saveDayMode from '../../functions/saveDayMode';
import { stopAudio } from './Audio';

export default function switchCardMode(learningScreenElement, target = null) {
  if (target == null || !target.classList.contains('active')) {
    const card = learningScreenElement.querySelector('card-word');
    if (card !== null) {
      stopAudio(card);
    }

    let isSwitch = false;
    if (
      learningScreenElement.state.mode === 'newWord' &&
      learningScreenElement.wordArrs.learnedWords.length !== 0
    ) {
      learningScreenElement.setState('mode', 'learning');
      isSwitch = true;
    } else if (
      learningScreenElement.state.mode === 'learning' &&
      learningScreenElement.wordArrs.newWords.length !== 0
    ) {
      learningScreenElement.setState('mode', 'newWord');

      isSwitch = true;
    }

    if (isSwitch) {
      learningScreenElement.querySelectorAll('div.modeButton').forEach((element) => {
        element.classList.toggle('active');
      });
      const repeatingButton = learningScreenElement.querySelector('div.repeating');
      if (repeatingButton !== null) {
        repeatingButton.classList.remove('active');
      }
      const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
      difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
      difficultyButtons.forEach((element) => element.classList.remove('opened'));
      setTimeout(
        () => difficultyButtons.forEach((element) => element.classList.add('readyToMove')),
        600,
      );

      saveDayMode(learningScreenElement);
    }
  }
}
