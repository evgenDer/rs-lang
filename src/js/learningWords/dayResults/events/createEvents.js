/* eslint-disable no-restricted-globals */
export default function createEventListener(card) {
  card.addEventListener('click', () => {
    if (event.target.closest('div[slot=buttonLeft]') != null) {
      window.localStorage.setItem('dayLearningDate', '-1');
      window.location.href = 'learningWords.html';
    } else if (event.target.closest('div[slot=buttonRight') != null) {
    }
  });
}
