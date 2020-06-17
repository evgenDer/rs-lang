import chooseMode from './chooseCardMode.js';
import createCard from '../../domBuilder/lightTree/createCard.js';
import checkAnswer from '../eventFunctions/checkAnswer.js';
import readIt from '../../functions/readWord.js';

export default function rightClick(learningScreenElement) {
  let isAnswerCorrect = true;

  if (learningScreenElement.state.currentCardIndex >= learningScreenElement.settings.newWordCount) {
    isAnswerCorrect = checkAnswer(learningScreenElement.querySelector('card-word'));

    if (isAnswerCorrect) {
      learningScreenElement.querySelectorAll('div.dot')[learningScreenElement.state.currentCardIndex].classList.remove('error');
      learningScreenElement.querySelectorAll('div.dot')[learningScreenElement.state.currentCardIndex].classList.add('success');
    } else {
      learningScreenElement.querySelectorAll('div.dot')[learningScreenElement.state.currentCardIndex].classList.add('error');
    }

  } else {
    learningScreenElement.querySelectorAll('div.dot')[learningScreenElement.state.currentCardIndex].classList.add('active');
    readIt(learningScreenElement.querySelector('card-word').state.word)
  }

  if (isAnswerCorrect) {
    learningScreenElement.localState.progressArr[learningScreenElement.state.currentCardIndex] = true;
    learningScreenElement.state.currentCardIndex += 1;
    createCard(learningScreenElement, chooseMode(learningScreenElement));
  } else {

  }
}
