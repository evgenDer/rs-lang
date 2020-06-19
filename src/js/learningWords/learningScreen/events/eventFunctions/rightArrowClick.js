import switchCardMode from './switchCardMode.js';
import createCard from '../../domBuilder/lightTree/createCard.js';

import checkAnswer from '../eventFunctions/checkAnswer.js';
import readIt from '../../functions/readWord.js';

import saveDayLocalState from '../../functions/saveDayLocalState.js';

export default function rightClick(learningScreenElement) {
  let isAnswerCorrect = true;
  let isFirstTimeDone = false;
  const currentNewWordCardIndex = learningScreenElement.state.currentNewWordCardIndex;
  const currentLearningCardIndex = learningScreenElement.state.currentLearningCardIndex;
  const mode = learningScreenElement.state.mode;

  if (learningScreenElement.state.mode == 'newWord') {
    isFirstTimeDone = learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex];
  } else {
    isFirstTimeDone = learningScreenElement.localState.learningProgressArr[currentLearningCardIndex];
  }

  if (learningScreenElement.state.mode == 'learning') {
    isAnswerCorrect = checkAnswer(learningScreenElement.querySelector('card-word'));

    if (isAnswerCorrect) {
      learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[currentLearningCardIndex].classList.remove('error');
      learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[currentLearningCardIndex].classList.add('success');
      learningScreenElement.localState.learningProgressArr[currentLearningCardIndex] = true;
      saveDayLocalState(learningScreenElement);
      learningScreenElement.state.currentLearningCardIndex += 1;
    } else {
      learningScreenElement.querySelectorAll('div.dot[slot=learningStatusPoint]')[currentLearningCardIndex].classList.add('error');
    }

  } else {
    learningScreenElement.querySelectorAll('div.dot[slot=newWordStatusPoint]')[currentNewWordCardIndex].classList.add('active');
    learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex] = true;
    saveDayLocalState(learningScreenElement);
    learningScreenElement.state.currentNewWordCardIndex += 1;
  }

  if ((learningScreenElement.state.currentNewWordCardIndex == learningScreenElement.settings.newWordCount) && (learningScreenElement.state.mode == 'newWord')) {
    learningScreenElement.setState('currentNewWordCardIndex', 0);
    switchCardMode(learningScreenElement);
  } else if ((learningScreenElement.state.currentLearningCardIndex == learningScreenElement.settings.wordCount) && (learningScreenElement.state.mode == 'learning')) {

  }

  if (isAnswerCorrect) {
    if (learningScreenElement.settings.enableAutomaticAudio && !isFirstTimeDone) {
      const card = learningScreenElement.querySelector('card-word');
      readIt(card.state.word);
      if (card.settings.showExplanationExample) { readIt(card.state.textExample); }
      if (card.settings.showSentenceExplanation) { readIt(card.state.textMining); }
    }

    createCard(learningScreenElement);
  } else {

  }
}
