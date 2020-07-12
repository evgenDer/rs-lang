/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import checkDeleteWordMode from '../../functions/findNexWordIndex';

export default function createCard(learningScreenElement) {
  const { currentNewWordCardIndex } = learningScreenElement.state;
  const { currentLearningCardIndex } = learningScreenElement.state;
  const { mode } = learningScreenElement.state;

  const prevCard = learningScreenElement.querySelector('card-word');
  if (prevCard != null) {
    prevCard.remove();
  }

  learningScreenElement.insertAdjacentHTML('beforeend', "<card-word slot='card'></card-word>");
  const card = learningScreenElement.querySelector('card-word');
  card.localState.isFirstCreating = true;

  for (const prop in card.settings) {
    card.setSettings(prop, learningScreenElement.settings[prop]);
  }

  card.setState('mode', mode);
  if (mode === 'newWord') {
    card.state = learningScreenElement.wordArrs.newWords[currentNewWordCardIndex];
    card.setState(
      'isDone',
      learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex],
    );
  } else if (mode === 'learning') {
    card.state = learningScreenElement.wordArrs.learnedWords[currentLearningCardIndex];
    card.setState(
      'isDone',
      learningScreenElement.localState.learningProgressArr[currentLearningCardIndex],
    );
  } else if (mode === 'repeating') {
    const { currentRepeatingCardIndex } = learningScreenElement.state;
    card.state = learningScreenElement.wordArrs.needToRepeat[currentRepeatingCardIndex];
    card.setState(
      'isDone',
      learningScreenElement.localState.needToRepeatProgressArr[currentRepeatingCardIndex],
    );
  }

  if (card.state.isDone) {
    const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
    difficultyButtons.forEach((element) => element.classList.add('opened'));
  }
}
