import updateCard from '../../domBuilder/lightTree/updateCard.js';
import saveDayLocalState from '../../functions/saveDayLocalState.js';

export default function daleteCard(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const cardIndex = learningScreenElement.state.currentLearningCardIndex;

  learningScreenElement.localState.learningProgressArr[learningScreenElement.state.currentLearningCardIndex] = true;
  learningScreenElement.localState.deletedArr[learningScreenElement.state.currentLearningCardIndex] = true;
  saveDayLocalState(learningScreenElement);

  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('error');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('hard');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('success');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('noAnswered');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.add('deleted');

  updateCard(learningScreenElement);
}
