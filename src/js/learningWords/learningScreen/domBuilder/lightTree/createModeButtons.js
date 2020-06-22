export default function createModeButtons(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML('beforeend', `
<div slot='modeButtonLeft' class='modeButton'>New Words</div>
<div slot='modeButtonRight' class='modeButton'>Learning</div>
`);
  if (learningScreenElement.state.mode === 'newWord') {
    learningScreenElement.querySelectorAll('div.modeButton')[0].classList.add('active');
  } else {
    learningScreenElement.querySelectorAll('div.modeButton')[1].classList.add('active');
  }
}
