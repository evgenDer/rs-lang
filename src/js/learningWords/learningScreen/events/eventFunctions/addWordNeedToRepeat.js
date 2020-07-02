export default function addWordNeedToRepeat(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  let word = null;
  word = card.state;
  card.state.optional.mode = 'needToRepeat';
  learningScreenElement.localState.needToRepeatProgressArr.push(false);
  learningScreenElement.wordArrs.needToRepeat.push(word);
}
