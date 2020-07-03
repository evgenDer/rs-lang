export default function addWordNeedToRepeat(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  let word = null;
  word = card.state;
  if (card.state.optional.mode !== 'needToRepeat') {
    card.state.optional.mode = 'needToRepeat';
    learningScreenElement.localState.needToRepeatProgressArr.push(false);
    learningScreenElement.wordArrs.needToRepeat.push(word);
  }
}
