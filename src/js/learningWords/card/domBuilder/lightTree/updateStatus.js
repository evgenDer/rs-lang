import {markToText, markToStyle} from '../../../../constants/progressBarTooltipTypes';

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
