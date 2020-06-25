export default function findNexWordIndex(learningScreenElement, screenMode, mode = 'right') {

  if (mode === 'right') {
    if (screenMode === 'newWord') {
      for (let i = 0; i < learningScreenElement.wordArrs.newWords.length; i += 1) {
        const word = learningScreenElement.wordArrs.newWords[i];
        const isDone = learningScreenElement.localState.newWordProgressArr[i];
        if (word.optional.mode !== 'deleted' && !isDone) {
          return i;
        }
      }
    } else if (screenMode === 'learning') {
      for (let i = 0; i < learningScreenElement.wordArrs.learnedWords.length; i += 1) {
        const word = learningScreenElement.wordArrs.learnedWords[i];
        const isDone = learningScreenElement.localState.learningProgressArr[i];
        if (word.optional.mode !== 'deleted' && !isDone) {
          return i;
        }
      }
    } else if (screenMode === 'repeating') {
      for (let i = 0; i < learningScreenElement.wordArrs.needToRepeat.length; i += 1) {
        const word = learningScreenElement.wordArrs.needToRepeat[i];
        const isDone = learningScreenElement.localState.needToRepeatProgressArr[i];
        if (word.optional.mode !== 'deleted' && !isDone) {
          return i;
        }
      }
    }
  } else {
    if (screenMode === 'newWord' && learningScreenElement.state.currentNewWordCardIndex > 0) {
      for (let i = learningScreenElement.state.currentNewWordCardIndex - 1; i >= 0; i -= 1) {
        const word = learningScreenElement.wordArrs.newWords[i];
        if (word.optional.mode !== 'deleted') {
          return i;
        }
      }
    } else if (screenMode === 'learning' && learningScreenElement.state.currentLearningCardIndex > 0) {
      for (let i = learningScreenElement.state.currentLearningCardIndex - 1; i >= 0; i -= 1) {
        const word = learningScreenElement.wordArrs.learnedWords[i];
        if (word.optional.mode !== 'deleted') {
          return i;
        }
      }
    }
  }

  return -1;

}
