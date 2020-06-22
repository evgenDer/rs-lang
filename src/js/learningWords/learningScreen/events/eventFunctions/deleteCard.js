/* eslint-disable no-param-reassign */
import updateCard from '../../domBuilder/lightTree/updateCard';
import saveDayLocalState from '../../functions/saveDayLocalState';

export default function daleteCard(learningScreenElement) {
  const cardIndex = learningScreenElement.state.currentLearningCardIndex;

  learningScreenElement.localState.learningProgressArr[cardIndex] = true;
  learningScreenElement.localState.deletedArr[cardIndex] = true;
  saveDayLocalState(learningScreenElement);

  learningScreenElement
    .querySelectorAll('div.dot[slot=learningStatusPoint]')
    [cardIndex].classList.remove('error');
  learningScreenElement
    .querySelectorAll('div.dot[slot=learningStatusPoint]')
    [cardIndex].classList.remove('hard');
  learningScreenElement
    .querySelectorAll('div.dot[slot=learningStatusPoint]')
    [cardIndex].classList.remove('success');
  learningScreenElement
    .querySelectorAll('div.dot[slot=learningStatusPoint]')
    [cardIndex].classList.remove('noAnswered');
  learningScreenElement
    .querySelectorAll('div.dot[slot=learningStatusPoint]')
    [cardIndex].classList.add('deleted');

  updateCard(learningScreenElement);
}
