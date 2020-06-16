export default function initLearningMode(cardElement) {
  cardElement.insertAdjacentHTML('beforeend',
    `<span slot='ENBlock'>${cardElement.state.word}</span>
  <span slot='RUBlock'>${cardElement.state.translation}</span>
  `);
}
