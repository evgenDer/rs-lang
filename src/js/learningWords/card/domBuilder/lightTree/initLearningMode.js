import LearningLineElement from '../../components/learningLineElement.js';
customElements.define('learning-line', LearningLineElement);

export default function initLearning(cardElement) {
  cardElement.innerHTML = `
  <learning-line slot='ENitem'></learning-line>
  <span slot='RUitem'>${cardElement.state.wordTranslate}</span>`;
  const learningline = cardElement.querySelector('learning-line');

  for (let prop in cardElement.state) {
    learningline.setState(prop, cardElement.state[prop]);
  }

}
