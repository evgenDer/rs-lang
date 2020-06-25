import switchCardMode from './switchCardMode';
import findNexWordIndex from '../../functions/findNexWordIndex';

export default function whatsNext(learningScreenElement, mode = 'right') {
  let willCreateCard = false;

  if (learningScreenElement.state.mode === 'learning') {
    const wordIndex = findNexWordIndex(learningScreenElement, 'learning', mode);

    if (wordIndex === -1) {
      const wordIndex = findNexWordIndex(learningScreenElement, 'newWord', mode)

      if (wordIndex === -1) {
        // Все слова сделаны
      } else {
        learningScreenElement.state.currentNewWordCardIndex = wordIndex;
        switchCardMode(learningScreenElement);
        willCreateCard = true;
      }
    } else {
      learningScreenElement.state.currentLearningCardIndex = wordIndex;
      willCreateCard = true;
    }
  } else if (learningScreenElement.state.mode === 'newWord') {
    const wordIndex = findNexWordIndex(learningScreenElement, 'newWord', mode);

    if (wordIndex === -1) {
      const wordIndex = findNexWordIndex(learningScreenElement, 'learning', mode)

      if (wordIndex === -1) {
        // Все слова сделаны
      } else {
        learningScreenElement.state.currentLearningCardIndex = wordIndex;
        switchCardMode(learningScreenElement);
        willCreateCard = true;
      }
    } else {
      learningScreenElement.state.currentNewWordCardIndex = wordIndex;
      willCreateCard = true;
    }
  }

  return willCreateCard;
}
