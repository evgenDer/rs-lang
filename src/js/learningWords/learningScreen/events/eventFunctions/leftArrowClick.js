import chooseMode from './chooseCardMode.js';
import createCard from '../../domBuilder/lightTree/createCard.js';

export default function leftClick(learningScreenElement) {
  learningScreenElement.state.currentCardIndex -= 1;
  createCard(learningScreenElement, chooseMode(learningScreenElement));
}
