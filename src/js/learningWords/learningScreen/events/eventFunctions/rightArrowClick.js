import switchCardMode from './switchCardMode.js';
import createCard from '../../domBuilder/lightTree/createCard.js';

import checkAnswer from '../eventFunctions/checkAnswer.js';
import readIt from '../../functions/readWord.js';

export default function rightClick(learningScreenElement) {
  let isAnswerCorrect = true;
  const currentNewWordCardIndex = learningScreenElement.state.currentNewWordCardIndex;
  const currentLearningCardIndex = learningScreenElement.state.currentLearningCardIndex;
  const mode = learningScreenElement.state.mode;

  if (learningScreenElement.state.mode == 'learning') {
    isAnswerCorrect = checkAnswer(learningScreenElement.querySelector('card-word'));

    if (isAnswerCorrect) {
      learningScreenElement.querySelectorAll('div.dot')[currentLearningCardIndex].classList.remove('error');
      learningScreenElement.querySelectorAll('div.dot')[currentLearningCardIndex].classList.add('success');
      learningScreenElement.localState.learningProgressArr[currentLearningCardIndex] = true;
      learningScreenElement.state.currentLearningCardIndex += 1;
    } else {
      learningScreenElement.querySelectorAll('div.dot')[currentLearningCardIndex].classList.add('error');
    }

  } else {
    learningScreenElement.querySelectorAll('div.dot')[currentNewWordCardIndex].classList.add('active');
    learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex] = true;
    learningScreenElement.state.currentNewWordCardIndex += 1;
  }

  if ((learningScreenElement.state.currentNewWordCardIndex == learningScreenElement.settings.newWordCount) && (learningScreenElement.state.mode == 'newWord')) {
    learningScreenElement.setState('currentNewWordCardIndex', 0);
    switchCardMode(learningScreenElement);
  } else if ((learningScreenElement.state.currentLearningCardIndex == learningScreenElement.settings.wordCount) && (learningScreenElement.state.mode == 'learning')) {

  }

  if (isAnswerCorrect) {
    readIt(learningScreenElement.querySelector('card-word').state.word);
    createCard(learningScreenElement);
  } else {

  }
}
