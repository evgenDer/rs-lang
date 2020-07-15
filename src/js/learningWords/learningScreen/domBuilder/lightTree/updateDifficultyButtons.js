export default function updateDifficultyButtons(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const activeButton = learningScreenElement.querySelector(
    `.difficultyButton.${card.state.difficulty}`,
  );
  learningScreenElement
    .querySelectorAll(`.difficultyButton`)
    .forEach((element) => element.classList.remove('active'));
  activeButton.classList.add('active');
}
