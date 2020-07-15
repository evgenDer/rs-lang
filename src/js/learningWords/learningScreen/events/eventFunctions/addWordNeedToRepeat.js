export default function addWordNeedToRepeat(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  let word = null;
  word = card.state;
  learningScreenElement.localState.needToRepeatProgressArr.push(false);
  learningScreenElement.wordArrs.needToRepeat.push(word);
}
