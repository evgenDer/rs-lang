import readIt from '../../learningScreen/functions/readWord.js';

export default function createEventListener(card) {
  card.addEventListener('click', () => {
    let item = null;
    if (event.target.closest('img[slot=pronunciation]') != null) {
      readIt(card.state.word);
    }

  })
}
