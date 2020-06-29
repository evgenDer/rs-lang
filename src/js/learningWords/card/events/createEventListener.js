/* eslint-disable no-restricted-globals */

export default function createEventListener(card) {
  card.addEventListener('click', () => {
    if (event.target.closest('img[slot=pronunciation]') != null) {
      card.audio.word.play();
    }
  });

  card.addEventListener('keydown', () => {
    const word2 = card.querySelector('[slot=word2]');
    if(word2!=null ){word2.remove()}
  })
}
