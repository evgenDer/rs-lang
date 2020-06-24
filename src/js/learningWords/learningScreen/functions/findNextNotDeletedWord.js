export default function findNextNotDeletedWord(learningScreenElement, currentWordIndex, switchMode = rigth) {
  const { mode } = learningScreenElement.state;
  let nextWordIndex = currentWordIndex;

  if (learningScreenElement.wordArrs.newWords[currentWordIndex].optional.mode === 'deleted') {
    learningScreenElement.state.currentNewWordCardIndex = switchMode === 'right' ?
      checkDeleteWordMode(learningScreenElement, currentWordIndex + 1, switchMode) :
      checkDeleteWordMode(learningScreenElement, currentWordIndex - 1, switchMode);
  } else {

  }

  if (learningScreenElement.wordArrs.learnedWords[currentWordIndex].optional.mode === 'deleted') {
    learningScreenElement.state.currentLearningCardIndex = switchMode === 'right' ?
      checkDeleteWordMode(learningScreenElement, currentWordIndex + 1, switchMode) :
      checkDeleteWordMode(learningScreenElement, currentWordIndex - 1, switchMode);

  }










  if (mode === 'newWord') {
    if (learningScreenElement.wordArrs.newWords[currentNewWordCardIndex].optional.mode === 'deleted') {
      learningScreenElement.state.currentNewWordCardIndex += 1;
      return checkDeleteWordMode(learningScreenElement);
    }
  } else if (mode === 'learning') {
    if (learningScreenElement.wordArrs.learnedWords[currentLearningCardIndex].optional.mode === 'deleted') {
      learningScreenElement.state.currentLearningCardIndex += 1;
      console.log(learningScreenElement.state);
      return checkDeleteWordMode(learningScreenElement);
    }
  }
  return false;
}
