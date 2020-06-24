export default function createDifficultyButtons(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML(
    'beforeend',
    `
  <div slot='difficultyButton' class='difficultyButton easy readyToMove'>Легко</div>
  <div slot='difficultyButton' class='difficultyButton normal readyToMove'>Хорошо</div>
  <div slot='difficultyButton' class='difficultyButton hard readyToMove'>Трудно</div>
`,
  );

}
