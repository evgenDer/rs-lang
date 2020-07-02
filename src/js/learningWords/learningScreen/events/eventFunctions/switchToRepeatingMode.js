export default function switchToRepeatingMode(learningScreenElement) {
  learningScreenElement.state.mode = 'repeating';
  learningScreenElement.wordArrs.needToRepeat.forEach((element) => {
    element.isDone = false;
    element.isFirstAnswer = true;
  });
  const modeButtons = learningScreenElement.querySelectorAll('[slot=modeButton]');
  modeButtons.forEach((element) => {
    if (element.classList.contains('repeating')) {
      element.classList.add('opened');
      element.classList.add('active');
    } else {
      element.classList.remove('opened');
      element.classList.remove('active');
    }
  });
}
