export default function createModeButtons(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML('beforeend', `
<div slot='modeButtonLeft' class='modeButton active'>New Words</div>
<div slot='modeButtonRight' class='modeButton'>Learning</div>
`)
}
