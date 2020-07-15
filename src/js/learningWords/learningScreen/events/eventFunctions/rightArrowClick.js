/* eslint-disable no-param-reassign */
import checkAnswer from './checkAnswer';
import whatsNext from './whatsNext';

import createCard from '../../domBuilder/lightTree/createCard';
import updateCardState from '../../domBuilder/lightTree/updateCardState';
import createResults from '../../domBuilder/lightTree/createResults';
import { updateStatusBar } from '../../domBuilder/lightTree/createStatusBar';

import { createUserWord, updateUserWord, deleteUserWord } from '../../../../api/userWords';
import {
  increaseWordErrorCount,
  increaseWordRightSequenceCount,
  increaseRepeatCount,
  openCardUpdate,
} from '../../../../words/updateWordState';

import saveDayLocalState from '../../functions/saveDayLocalState';
import addWordNeedToRepeat from './addWordNeedToRepeat';
import { stopAudio, playAudio } from './Audio';
import { WORD_STATE } from '../../../../utils/constants';
import updateDifficultyButtons from '../../domBuilder/lightTree/updateDifficultyButtons';

export default function rightClick(learningScreenElement) {
  let isAnswerCorrect = true;
  let isCardDone = false;
  let isFirstTimeDone = true;

  const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
  const card = learningScreenElement.querySelector('card-word');
  const cardMode = card.state.optional.mode;
  const screenMode = learningScreenElement.state.mode;

  const { currentNewWordCardIndex } = learningScreenElement.state;
  const { currentLearningCardIndex } = learningScreenElement.state;
  const { currentRepeatingCardIndex } = learningScreenElement.state;

  if (screenMode === 'newWord') {
    isCardDone = learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex];
  } else if (screenMode === 'learning') {
    isCardDone = learningScreenElement.localState.learningProgressArr[currentLearningCardIndex];
  } else {
    isCardDone =
      learningScreenElement.localState.needToRepeatProgressArr[currentRepeatingCardIndex];
  }

  if (!isCardDone) {
    const wordId = card.state.id;
    const wordDifficulty = card.state.difficulty;
    const wordOptions = card.state.optional;
    const word = {
      difficulty: wordDifficulty,
      optional: wordOptions,
    };

    if (card.querySelector('input').value.length != 0) {
      isAnswerCorrect = checkAnswer(learningScreenElement.querySelector('card-word'));
      if (isAnswerCorrect) {
        if (card.settings.enableAutomaticAudio && isFirstTimeDone) {
          playAudio(card);
        }
        isFirstTimeDone = false;

        difficultyButtons.forEach((element) => element.classList.add('opened'));

        if (card.state.isFirstAnswer) {
          if (screenMode === 'learning' || screenMode === 'newWord') {
            learningScreenElement.statistics.rightAnswers += 1;
            learningScreenElement.statistics.currentRightAnswerSeries += 1;
            learningScreenElement.stat.updateLearningStatistics(true);
            if (
              learningScreenElement.statistics.currentRightAnswerSeries >
              learningScreenElement.statistics.longestRightAnswerSeries
            ) {
              const rightAnswerSeries = learningScreenElement.statistics.currentRightAnswerSeries;
              learningScreenElement.statistics.longestRightAnswerSeries = rightAnswerSeries;
            }
          }
          increaseWordRightSequenceCount(word, false);
          increaseRepeatCount(word);
          if (cardMode === 'newWord') {
            createUserWord(wordId, word);
          } else {
            updateUserWord(wordId, word);
          }
        }

        if (screenMode === 'learning') {
          learningScreenElement.localState.learningProgressArr[currentLearningCardIndex] = true;
        } else if (screenMode === 'newWord') {
          learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex] = true;
        } else if (screenMode === 'repeating') {
          learningScreenElement.localState.needToRepeatProgressArr[
            currentRepeatingCardIndex
          ] = true;
        }

        updateStatusBar(learningScreenElement);
        saveDayLocalState(learningScreenElement);

        updateCardState(learningScreenElement);
      } else {
        if (card.state.isFirstAnswer) {
          if (screenMode === 'learning' || screenMode === 'newWord') {
            learningScreenElement.stat.updateLearningStatistics(false);
            learningScreenElement.statistics.currentRightAnswerSeries = 0;
            increaseWordErrorCount(word, false);
          } else {
            openCardUpdate(word);
          }

          increaseRepeatCount(word);
          addWordNeedToRepeat(learningScreenElement);

          if (cardMode === 'newWord') {
            createUserWord(wordId, word);
          } else {
            updateUserWord(wordId, word);
          }

          saveDayLocalState(learningScreenElement);

          updateCardState(learningScreenElement);
        }
      }

      card.state.isFirstAnswer = false;
    }
  } else {
    if (screenMode === 'repeating' && card.state.optional.mode === 'needToRepeat') {
      card.state.isDone = false;
      card.state.isFirstAnswer = true;
    }

    const willCreateCard = whatsNext(learningScreenElement);

    if (willCreateCard) {
      if (card.localState.isAudioPlaying) {
        stopAudio(card);
      }

      difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
      difficultyButtons.forEach((element) => element.classList.remove('opened'));
      setTimeout(
        () => difficultyButtons.forEach((element) => element.classList.add('readyToMove')),
        600,
      );

      createCard(learningScreenElement);
      updateDifficultyButtons(learningScreenElement);
    } else {
      window.scrollTo(pageYOffset, 0)
      createResults(learningScreenElement);
    }
  }
}
