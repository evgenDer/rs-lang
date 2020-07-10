import markToText from '../../../../constants/progressBarTooltipTypes';

const markToStyle = {
  '0': 'white',
  '1': '#338c99',
  '2': '#61bd4f',
  '3': '#0f2c5c',
  '4': '#c377e0',
  '5': '#ff934d',
}

export default function initLearning(cardElement) {
  const dots = cardElement.querySelectorAll('div.dot');
  const statusText = cardElement.querySelector('[slot=statusText]');
  const mark = Math.floor(cardElement.state.optional.successPoint);
  const currentColor = markToStyle[`${mark}`];
  dots.forEach((element, index) => {

    if (index <= (mark - 1)) {
      element.style.background = currentColor;
    } else {
      element.style.background = 'white';
    }
  })
  statusText.innerHTML = markToText[`${mark}`];
}
