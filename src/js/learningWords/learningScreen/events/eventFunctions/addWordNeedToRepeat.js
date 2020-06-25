export default function addWordNeedToRepeat(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const screenMode = learningScreenElement.state.mode;
  let word = null;
  /*
  if (screenMode === 'newWord') {
    word = learningScreenElement.wordArrs.newWords[learningScreenElement.state.currentNewWordCardIndex];
  } else if (screenMode === 'learning') {
    word = learningScreenElement.wordArrs.learnedWords[learningScreenElement.state.currentLearningCardIndex];
  } else if (screenMode === 'repeating') {
    word = learningScreenElement.wordArrs.needToRepeatArr[learningScreenElement.state.currentRepeatingCardIndex];
  }
*/
  word = card.state;
  card.state.optional.mode = 'needToRepeat';
  learningScreenElement.localState.needToRepeatProgressArr.push(false);
  learningScreenElement.wordArrs.needToRepeat.push(word);
}
