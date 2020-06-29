import saveDayMode from '../../functions/saveDayMode';

export default function switchCardMode(learningScreenElement, target = null) {
  if (target == null || !target.classList.contains('active')) {
    const card = learningScreenElement.querySelector('card-word');
    if (card !== null) {
      card.audio.word.pause();
      card.audio.example.pause();
      card.audio.meaning.pause();
      /*
      card.audio.word.src = null;
      card.audio.example.src = null;
      card.audio.meaning.src = null;
      */
    }

    let isSwitch = false;
    if (learningScreenElement.state.mode === 'newWord' && learningScreenElement.wordArrs.learnedWords.length !== 0) {
      learningScreenElement.setState('mode', 'learning');
      isSwitch = true;
    } else if (learningScreenElement.state.mode === 'learning' && learningScreenElement.wordArrs.newWords.length !== 0) {
      learningScreenElement.setState('mode', 'newWord');
      isSwitch = true;
    }

    if (isSwitch) {
      learningScreenElement.querySelectorAll('div.modeButton').forEach((element) => {
        element.classList.toggle('active');
      });
      const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
      difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
      difficultyButtons.forEach((element) => element.classList.remove('active'));
      setTimeout(() => difficultyButtons.forEach((element) => element.classList.add('readyToMove')), 600);

      saveDayMode(learningScreenElement);
    }
  }
}
