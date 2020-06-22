/* eslint-disable no-param-reassign */
import readIt from '../../functions/readWord';

const style = {
  correctLetterColor: '#61bd4f',
  oneMistakeColor: '#fce373',
  moreMistakeColor: '#fe5c55',
};

export default function checkAnswer(cardElement) {
  if (cardElement.querySelector('input') == null) {
    return true;
  }
  const answer = cardElement.querySelector('input').value.toLowerCase().trim();
  if (answer === cardElement.state.word) {
    readIt(answer);
    return true;
  }
  console.log(answer.length > 0);
  if (answer.length > 0) {
    let comparison = '';
    let mistakes = 0;
    for (let i = 0; i < cardElement.state.word.length; i += 1) {
      if (cardElement.state.word[i] === answer[i]) {
        comparison += `<span style='color:${style.correctLetterColor}'>${cardElement.state.word[i]}</span>`;
      } else {
        comparison += `<span class='wrongLetter'>${cardElement.state.word[i]}</span>`;
        mistakes += 1;
      }
    }

    cardElement.querySelector('input').value = '';

    const mistakeColor = mistakes > 1 ? '#fe5c55' : '#fce373';
    cardElement.querySelector('learning-line').insertAdjacentHTML('beforeend', `
    <span slot='word3' ><style>.wrongLetter {color: ${mistakeColor}}</style>${comparison}</span>`);

    setTimeout(() => cardElement.querySelector('span[slot=word3]').classList.add('animatted'), 1000);
    setTimeout(() => {
      cardElement.querySelector('learning-line').insertAdjacentHTML('beforeend', `<span slot='word2'>${cardElement.state.word}</span>`);
      cardElement.querySelector('span[slot=word3]').remove();
    }, 1500);
  }


  return false;
}
