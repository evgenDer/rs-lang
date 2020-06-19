import updateCard from '../../domBuilder/lightTree/updateCard.js';
import readIt from '../../functions/readWord.js';
import saveDayLocalState from '../../functions/saveDayLocalState.js';

export default function openCard(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const cardIndex = learningScreenElement.state.currentLearningCardIndex;

  learningScreenElement.localState.learningProgressArr[learningScreenElement.state.currentLearningCardIndex] = true;
  saveDayLocalState(learningScreenElement);

  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('error');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.remove('hard');
  learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[cardIndex].classList.add('noAnswered');

  if (learningScreenElement.settings.enableAutomaticAudio) {
    readIt(card.state.word);
    if (card.settings.showExplanationExample) { readIt(card.state.textExample); }
    if (card.settings.showSentenceExplanation) { readIt(card.state.textMining); }
  }

  updateCard(learningScreenElement);
}
