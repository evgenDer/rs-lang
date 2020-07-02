export default function createOptionButtons(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML(
    'beforeend',
    `<div slot='optionButton'> <img src='assets/img/icons/music.svg' style='width:30px; height:30px; object-fit: cover;'></div>`,
  );
}
