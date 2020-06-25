export default function switchToRepeatingMode(learningScreenElement) {
  learningScreenElement.state.mode = 'repeating';
  learningScreenElement.querySelectorAll('.modeButton')
    .forEach((element) => element.classList.add('inactive'));
  learningScreenElement.querySelector('[slot=leftArrow]').classList.add('inactive');


  learningScreenElement.wordArrs.needToRepeat.forEach((element) => {
    element.isDone = false;
    element.isFirstAnswer = true;
  })
  console.log(learningScreenElement.wordArrs.needToRepeat);
}
