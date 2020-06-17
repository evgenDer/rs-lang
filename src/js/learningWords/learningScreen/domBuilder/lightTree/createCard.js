export default function createCard(learningScreenElement, mode) {
  const prevCard = learningScreenElement.querySelector('card-word');
  if (prevCard != null) { prevCard.remove() }

  learningScreenElement.insertAdjacentHTML('beforeend', `<card-word slot='card'></card-word>`);
  const card = learningScreenElement.querySelector('card-word');
  const currentCardIndex = learningScreenElement.state.currentCardIndex;

  card.setState(`mode`, mode);
  card.setState(`isDone`, learningScreenElement.localState.progressArr[currentCardIndex])

  if (currentCardIndex <= learningScreenElement.settings.newWordCount - 1) {
    for (let prop in learningScreenElement.wordArrs.newWords[currentCardIndex]) {
      card.setState(prop, learningScreenElement.wordArrs.newWords[currentCardIndex][prop])
    }
  } else if ((currentCardIndex - learningScreenElement.settings.newWordCount) <= learningScreenElement.settings.wordCount - 1) {
    for (let prop in learningScreenElement.wordArrs.learnedWords[currentCardIndex - learningScreenElement.settings.newWordCount]) {
      card.setState(prop, learningScreenElement.wordArrs.learnedWords[currentCardIndex - learningScreenElement.settings.newWordCount][prop])
    }
  }

}
