export default function createCard(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const { currentLearningCardIndex } = learningScreenElement.state;
  card.setState('isDone', learningScreenElement.localState.learningProgressArr[currentLearningCardIndex]);
  card.setState('isDeleted', learningScreenElement.localState.deletedArr[currentLearningCardIndex]);
}
