/* eslint-disable no-param-reassign */
import updateCard from '../../domBuilder/lightTree/updateCard';
import saveDayLocalState from '../../functions/saveDayLocalState';

export default function restoreCard(learningScreenElement) {
  const cardIndex = learningScreenElement.state.currentLearningCardIndex;

  learningScreenElement.localState.learningProgressArr[cardIndex] = false;
  learningScreenElement.localState.deletedArr[cardIndex] = false;
  saveDayLocalState(learningScreenElement);

  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('error');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('hard');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('success');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('noAnswered');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('deleted');

  updateCard(learningScreenElement);
}
