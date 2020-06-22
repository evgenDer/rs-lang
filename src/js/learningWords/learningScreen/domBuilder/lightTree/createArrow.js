export default function createArrow(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML(
    'beforeend',
    `
  <img  src='assets/img/icons/switchArrow.svg' slot='leftArrow' class='arrow left'>
  <img  src='assets/img/icons/switchArrow.svg' slot='rightArrow' class='arrow right'>`,
  );
}
