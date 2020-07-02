/* eslint-disable no-param-reassign */
import checkAnswer from './checkAnswer';
import whatsNext from './whatsNext';

import createCard from '../../domBuilder/lightTree/createCard';
import updateCard from '../../domBuilder/lightTree/updateCard';
import createResults from '../../domBuilder/lightTree/createResults';
import { updateStatusBar } from '../../domBuilder/lightTree/createStatusBar';

import { createUserWord, updateUserWord, deleteUserWord } from '../../../../api/userWords';
import {
  increaseWordErrorCount,
  increaseWordRightSequenceCount,
  increaseRepeatCount,
} from '../../../../words/updateWordState';

import saveDayLocalState from '../../functions/saveDayLocalState';
import addWordNeedToRepeat from './addWordNeedToRepeat';
import { stopAudio, playAudio } from './Audio';

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

        difficultyButtons.forEach((element) => element.classList.add('active'));

        if (card.state.isFirstAnswer) {
          increaseWordRightSequenceCount(word);
          increaseRepeatCount(word);
          if (cardMode === 'newWord') {
            createUserWord(wordId, word);
          } else {
            console.log(word);
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

        console.log(learningScreenElement.wordArrs.needToRepeat);
        console.log(learningScreenElement.localState.needToRepeatProgressArr);

        updateStatusBar(learningScreenElement);
        saveDayLocalState(learningScreenElement);

        updateCard(learningScreenElement);
      } else {
        if (card.state.isFirstAnswer) {
          increaseWordErrorCount(word);
          increaseRepeatCount(word);
          addWordNeedToRepeat(learningScreenElement);

          if (cardMode === 'newWord') {
            createUserWord(wordId, word);
          } else {
            console.log(word);
            updateUserWord(wordId, word);
          }

          saveDayLocalState(learningScreenElement);

          updateCard(learningScreenElement);
        }
      }

      console.log(learningScreenElement.wordArrs.needToRepeat);
      console.log(currentRepeatingCardIndex);
      console.log(learningScreenElement.localState.needToRepeatProgressArr);

      card.state.isFirstAnswer = false;
    } else {
      console.log('freeeee');
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

      /*
      card.audio.word.src = null;
      card.audio.example.src = null;
      card.audio.meaning.src = null;
      */
      difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
      difficultyButtons.forEach((element) => element.classList.remove('active'));
      setTimeout(
        () => difficultyButtons.forEach((element) => element.classList.add('readyToMove')),
        600,
      );

      createCard(learningScreenElement);
    } else {
      createResults(learningScreenElement);
    }
  }
}
