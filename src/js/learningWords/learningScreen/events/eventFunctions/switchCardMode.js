import saveDayMode from '../../functions/saveDayMode.js';

export default function switchCardMode(learningScreenElement, target = null) {
  if (target == null || !target.classList.contains('active')) {
    learningScreenElement.querySelectorAll('div.modeButton').forEach(element => {
      element.classList.toggle('active');
    });

    if (learningScreenElement.state.mode == 'newWord') {
      learningScreenElement.setState('mode', 'learning')
    } else {
      learningScreenElement.setState('mode', 'newWord')
    }
    saveDayMode(learningScreenElement);
  }

}
