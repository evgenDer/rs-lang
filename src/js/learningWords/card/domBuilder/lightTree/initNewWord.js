export default function initNewWord(cardElement) {
  cardElement.innerHTML = `<span slot='ENitem'>${cardElement.state.word}</span>
  <span slot='RUitem'>${cardElement.state.translation}</span>`;
}
