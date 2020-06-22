export default function chooseCardMode(learningScreenElement) {
  let cardMode = 'learning';
  if (learningScreenElement.state.currentCardIndex < learningScreenElement.settings.newWordCount) {
    cardMode = 'newWord';
  }
  return cardMode;
}
