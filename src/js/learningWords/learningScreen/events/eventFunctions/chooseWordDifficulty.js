import cardShadowTreeHTML from "../../../card/domBuilder/shadowTree/shadowTree";

export default function chooseWordDifficulty(learningScreenElement, eventTarget) {
  const difficulty = eventTarget.classList[1];
  const card = learningScreenElement.querySelector('card-word');
  card.state.difficulty = difficulty;
}
