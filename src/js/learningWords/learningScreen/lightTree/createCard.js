export default function createCard(learningScreenElement) {
  const prevCard = learningScreenElement.querySelector('card-word');
  if (prevCard != null) { prevCard.remove() }
  learningScreenElement.insertAdjacentHTML('beforeend', `<card-word slot='card'></card-word>`);

  const card = learningScreenElement.querySelector('card-word');
  const currentCardIndex = learningScreenElement.state.currentCardIndex;

  if (currentCardIndex <= learningScreenElement.settings.newWordCount - 1) {

    card.setState(`mode`, 'newWord')
    for (let prop in learningScreenElement.wordArrs.newWords[currentCardIndex]) {
      console.log(prop);
      console.log(learningScreenElement.wordArrs.newWords[currentCardIndex][prop])
      card.setState(prop, learningScreenElement.wordArrs.newWords[currentCardIndex][prop])
    }
  } else { card.setState(mode, 'learningWord') }

  //Передать карточке нужные атрибуты и состояния через сетСтейт из  learningScreenElement.wordArrs.newWords[currentCardIndex];

}
