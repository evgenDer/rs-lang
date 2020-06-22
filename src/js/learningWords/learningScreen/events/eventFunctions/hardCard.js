export default function hardCard(learningScreenElement) {
  const cardIndex = learningScreenElement.state.currentLearningCardIndex;

  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('error');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.add('hard');
}
