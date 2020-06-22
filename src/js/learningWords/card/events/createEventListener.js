/* eslint-disable no-restricted-globals */
import readIt from '../../learningScreen/functions/readWord';

export default function createEventListener(card) {
  card.addEventListener('click', () => {
    if (event.target.closest('img[slot=pronunciation]') != null) {
      readIt(card.state.word);
    }
  });
}
