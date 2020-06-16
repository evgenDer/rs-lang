import WordCardElement from '../card/cardElement.js';
customElements.define('card-word', WordCardElement);

export default function createCard(learningScreenElement) {
  learningScreenElement.querySelector('card-word').remove();

  learningScreenElement.insertAdjacentHTML = ('beforeend', `<card-word slot='card'></card-word>`);
  const card = learningScreenElement.querySelector('card-word');
  const currentCardIndex = learningScreenElement.state.currentCardIndex;
  //Передать карточке нужные атрибуты и состояния через сетСтейт из  learningScreenElement.wordArrs.newWords[currentCardIndex];
  card.setState();
}
