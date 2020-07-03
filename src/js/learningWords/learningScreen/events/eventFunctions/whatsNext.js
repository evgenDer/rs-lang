import switchCardMode from './switchCardMode';
import findNexWordIndex from '../../functions/findNexWordIndex';
import switchToRepeatingMode from './switchToRepeatingMode';

export default function whatsNext(learningScreenElement, mode = 'right') {
  let willCreateCard = false;

  if (learningScreenElement.state.mode === 'learning') {
    const wordIndex = findNexWordIndex(learningScreenElement, 'learning', mode);

    if (wordIndex === -1) {
      const wordIndex = findNexWordIndex(learningScreenElement, 'newWord', mode);

      if (wordIndex === -1) {
        // Все слова сделаны
        if (learningScreenElement.wordArrs.needToRepeat.length !== 0) {
          switchToRepeatingMode(learningScreenElement);
          const wordIndex = findNexWordIndex(learningScreenElement, 'repeating');
          if (wordIndex === -1) {
          } else {
            learningScreenElement.state.currentRepeatingCardIndex = wordIndex;
            willCreateCard = true;
          }
        } else {
        }
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
      const wordIndex = findNexWordIndex(learningScreenElement, 'learning', mode);

      if (wordIndex === -1) {
        // Все слова сделаны
        if (learningScreenElement.wordArrs.needToRepeat.length !== 0) {
          switchToRepeatingMode(learningScreenElement);
          const wordIndex = findNexWordIndex(learningScreenElement, 'repeating');
          if (wordIndex === -1) {
          } else {
            learningScreenElement.state.currentRepeatingCardIndex = wordIndex;
            willCreateCard = true;
          }
        } else {
          //Все изучено и улажено
          console.log('Дело сделано');
        }
      } else {
        learningScreenElement.state.currentLearningCardIndex = wordIndex;
        switchCardMode(learningScreenElement);
        willCreateCard = true;
      }
    } else {
      learningScreenElement.state.currentNewWordCardIndex = wordIndex;
      willCreateCard = true;
    }
  } else if (learningScreenElement.state.mode === 'repeating') {
    const wordIndex = findNexWordIndex(learningScreenElement, 'repeating');
    if (wordIndex === -1) {
      console.log('Дело сделано');
      //Все изучено и улажено
    } else {
      learningScreenElement.state.currentRepeatingCardIndex = wordIndex;
      willCreateCard = true;
    }
  }

  return willCreateCard;
}
