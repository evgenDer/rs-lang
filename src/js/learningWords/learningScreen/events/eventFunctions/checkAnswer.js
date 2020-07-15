/* eslint-disable no-param-reassign */

const style = {
  correctLetterColor: '#61bd4f',
  oneMistakeColor: '#fce373',
  moreMistakeColor: '#fe5c55',
};

export default function checkAnswer(cardElement) {
  const rightWord = cardElement.state.word.toLowerCase();
  if (cardElement.querySelector('input') === null) {
    return true;
  }
  const answer = cardElement.querySelector('input').value.toLowerCase().trim();
  if (answer === rightWord) {
    return true;
  }
  if (answer.length > 0) {
    let comparison = '';
    let mistakes = 0;
    for (let i = 0; i < rightWord.length; i += 1) {
      if (rightWord[i] === answer[i]) {
        comparison += `<span style='color:${style.correctLetterColor}'>${rightWord[i]}</span>`;
      } else {
        comparison += `<span class='wrongLetter'>${rightWord[i]}</span>`;
        mistakes += 1;
      }
    }

    const word2 = cardElement.querySelector('learning-line [slot=word2]');
    const word3 = cardElement.querySelector('learning-line [slot=word3]');
    if (word2 !== null) {
      word2.remove();
    }
    if (word3 !== null) {
      word3.remove();
    }

    cardElement.querySelector('input').value = '';

    const mistakeColor = mistakes > 1 ? '#fe5c55' : '#fce373';
    cardElement.querySelector('learning-line').insertAdjacentHTML(
      'beforeend',
      `
    <span slot='word3' ><style>.wrongLetter {color: ${mistakeColor}}</style>${comparison}</span>`,
    );

    setTimeout(
      () => {
        const word3 = cardElement.querySelector('span[slot=word3]');
        if (word3 !== null) { word3.classList.add('animatted'); }
      },
      1000,
    );
    setTimeout(() => {
      cardElement
        .querySelector('learning-line')
        .insertAdjacentHTML('beforeend', `<span slot='word2'>${rightWord}</span>`);
      const word3 = cardElement.querySelector('span[slot=word3]');
      if (word3 !== null) { word3.remove(); }
    }, 1500);
  }

  return false;
}
