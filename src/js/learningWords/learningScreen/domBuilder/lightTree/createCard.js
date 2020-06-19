export default function createCard(learningScreenElement) {
  const prevCard = learningScreenElement.querySelector('card-word');
  if (prevCard != null) { prevCard.remove() }

  learningScreenElement.insertAdjacentHTML('beforeend', `<card-word slot='card'></card-word>`);
  const card = learningScreenElement.querySelector('card-word');
  const currentNewWordCardIndex = learningScreenElement.state.currentNewWordCardIndex;
  const currentLearningCardIndex = learningScreenElement.state.currentLearningCardIndex;
  const mode = learningScreenElement.state.mode;

  card.setState(`mode`, mode);
  if (mode == 'newWord') {
    card.setState(`isDone`, learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex])
    for (let prop in learningScreenElement.wordArrs.newWords[currentNewWordCardIndex]) {
      card.setState(prop, learningScreenElement.wordArrs.newWords[currentNewWordCardIndex][prop])
    }
  } else if (mode == 'learning') {
    card.setState(`isDone`, learningScreenElement.localState.learningProgressArr[currentLearningCardIndex])
    for (let prop in learningScreenElement.wordArrs.learnedWords[currentLearningCardIndex]) {
      card.setState(prop, learningScreenElement.wordArrs.learnedWords[currentLearningCardIndex][prop])
    }
  }

}
