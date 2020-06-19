import createCard from '../../domBuilder/lightTree/createCard.js';

export default function leftClick(learningScreenElement) {
  if (learningScreenElement.state.mode == 'newWord') {
    if (learningScreenElement.state.currentNewWordCardIndex > 0) {
      learningScreenElement.state.currentNewWordCardIndex -= 1;
      createCard(learningScreenElement);
    }
  } else {
    if (learningScreenElement.state.currentLearningCardIndex > 0) {
      learningScreenElement.state.currentLearningCardIndex -= 1;
      createCard(learningScreenElement);
    }
  }
}
