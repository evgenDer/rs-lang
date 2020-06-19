export default function initNewWord(cardElement) {
  cardElement.innerHTML = `<span slot='ENitem'>${cardElement.state.word}</span>`;
  if (cardElement.settings.showWordTranscription) {
    cardElement.insertAdjacentHTML('beforeend', `<span slot='RUitem'>${cardElement.state.wordTranslate}</span>`)
  }
  if (cardElement.settings.showExplanationExample) {
    cardElement.insertAdjacentHTML('beforeend', `<span slot='ENExample'>${cardElement.state.textExample}</span>
    <span slot='RUExample'>${cardElement.state.textExampleTranslate}</span>`)
  }
  if (cardElement.settings.showSentenceExplanation) {
    cardElement.insertAdjacentHTML('beforeend', `<span slot='ENMeaning'>${cardElement.state.textMeaning}</span>
    <span slot='RUMeaning'>${cardElement.state.textMeaningTranslate}</span>`)
  }
  if (cardElement.settings.showWordTranscription) {
    cardElement.insertAdjacentHTML('beforeend', `<span slot='transcription'>${cardElement.state.transcription}</span>`);
  }
  cardElement.insertAdjacentHTML('beforeend', `<div slot='cardImg'></div>`)

}
