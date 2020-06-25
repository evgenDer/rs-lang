/* eslint-disable no-param-reassign */
import createCard from '../../domBuilder/lightTree/createCard';
import whatsNext from './whatsNext';

export default function leftClick(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
  if ((learningScreenElement.state.mode === 'newWord'
    && learningScreenElement.state.currentNewWordCardIndex > 0)
    || (learningScreenElement.state.mode === 'learning')) {
    const willCreateCard = whatsNext(learningScreenElement, 'left');
    if (willCreateCard) {
      card.audio.word.pause();
      card.audio.example.pause();
      card.audio.meaning.pause();

      difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
      difficultyButtons.forEach((element) => element.classList.remove('active'));
      setTimeout(() => difficultyButtons.forEach((element) => element.classList.add('readyToMove')), 600);

      createCard(learningScreenElement);
    }
  }
}
