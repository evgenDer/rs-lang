/* eslint-disable no-restricted-globals */
export default function createEventListener(card) {
  card.addEventListener('click', () => {
    if (event.target.closest('div[slot=buttonLeft]') != null) {
      card.remove();
    }
  });
}
