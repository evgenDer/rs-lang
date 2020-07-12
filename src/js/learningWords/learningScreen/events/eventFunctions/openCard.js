/* eslint-disable no-param-reassign */
import updateCardState from '../../domBuilder/lightTree/updateCardState';
import { updateStatusBar } from '../../domBuilder/lightTree/createStatusBar';
import saveDayLocalState from '../../functions/saveDayLocalState';
import addWordNeedToRepeat from './addWordNeedToRepeat';

import { createUserWord, updateUserWord } from '../../../../api/userWords';
import { openCardUpdate } from '../../../../words/updateWordState';
import { playAudio } from './Audio';

export default function openCard(learningScreenElement) {
  const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
  const card = learningScreenElement.querySelector('card-word');
  const cardMode = card.state.optional.mode;
  const screenMode = learningScreenElement.state.mode;
  const { currentNewWordCardIndex } = learningScreenElement.state;
  const { currentLearningCardIndex } = learningScreenElement.state;
  const { currentRepeatingCardIndex } = learningScreenElement.state;

  if (screenMode === 'learning') {
    learningScreenElement.localState.learningProgressArr[currentLearningCardIndex] = true;
  } else if (screenMode === 'newWord') {
    learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex] = true;
  } else if (screenMode === 'repeating') {
    learningScreenElement.localState.needToRepeatProgressArr[currentRepeatingCardIndex] = true;
  }

  if (card.state.isFirstAnswer) {
    if (screenMode === 'learning' || screenMode === 'newWord') {
      learningScreenElement.stat.updateLearningStatistics(false);
      learningScreenElement.statistics.currentRightAnswerSeries = 0;
    }

    openCardUpdate(card.state);
    addWordNeedToRepeat(learningScreenElement);
    updateStatusBar(learningScreenElement);

    const wordId = card.state.id;
    const wordDifficulty = card.state.difficulty;
    const wordOptions = card.state.optional;
    const word = {
      difficulty: wordDifficulty,
      optional: wordOptions,
    };

    if (cardMode === 'newWord') {
      createUserWord(wordId, word);
    } else {
      updateUserWord(wordId, word);
    }
  }

  if (card.settings.enableAutomaticAudio) {
    playAudio(card);
  }

  difficultyButtons.forEach((element) => element.classList.add('opened'));

  saveDayLocalState(learningScreenElement);
  updateCardState(learningScreenElement);
}
