/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export default function createCard(learningScreenElement) {
  const prevCard = learningScreenElement.querySelector('card-word');
  if (prevCard != null) {
    prevCard.remove();
  }

  learningScreenElement.insertAdjacentHTML('beforeend', "<card-word slot='card'></card-word>");
  const card = learningScreenElement.querySelector('card-word');
  const { currentNewWordCardIndex } = learningScreenElement.state;
  const { currentLearningCardIndex } = learningScreenElement.state;
  const { mode } = learningScreenElement.state;

  card.setState('mode', mode);
  if (mode === 'newWord') {
    card.setState(
      'isDone',
      learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex],
    );
    for (const prop in learningScreenElement.wordArrs.newWords[currentNewWordCardIndex]) {
      card.setState(prop, learningScreenElement.wordArrs.newWords[currentNewWordCardIndex][prop]);
    }
  } else if (mode === 'learning') {
    card.setState(
      'isDone',
      learningScreenElement.localState.learningProgressArr[currentLearningCardIndex],
    );
    card.setState(
      'isDeleted',
      learningScreenElement.localState.deletedArr[currentLearningCardIndex],
    );
    for (const prop in learningScreenElement.wordArrs.learnedWords[currentLearningCardIndex]) {
      card.setState(
        prop,
        learningScreenElement.wordArrs.learnedWords[currentLearningCardIndex][prop],
      );
    }
  }
}
