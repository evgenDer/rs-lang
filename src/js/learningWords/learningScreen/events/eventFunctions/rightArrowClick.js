/* eslint-disable no-param-reassign */
import switchCardMode from './switchCardMode';
import checkAnswer from './checkAnswer';

import createCard from '../../domBuilder/lightTree/createCard';
import updateCard from '../../domBuilder/lightTree/updateCard';
import createResults from '../../domBuilder/lightTree/createResults';
import { updateStatusBar } from '../../domBuilder/lightTree/createStatusBar';

import { createUserWord, updateUserWord, deleteUserWord } from '../../../../api/userWords';
import {
  getUpdatedUserWord, increaseWordErrorCount, increaseWordReferenceCount, switchDeleteModeUserWord,
  increaseWordRightSequenceCount, calculateRepeatTiming, increaseRepeatCount
} from '../../../../words/updateWordState';

import findNextNotDeletedWord from '../../functions/findNextNotDeletedWord';
import saveDayLocalState from '../../functions/saveDayLocalState';

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

  if (screenMode === 'newWord') {
    isCardDone = learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex];
  } else {
    isCardDone = learningScreenElement.localState.learningProgressArr[currentLearningCardIndex];
  }

  if (!isCardDone) {
    const wordId = card.state.id;
    const wordDifficulty = card.state.difficulty;
    const wordOptions = card.state.optional;
    const word = {
      "difficulty": wordDifficulty,
      "optional": wordOptions,
    }

    isAnswerCorrect = checkAnswer(learningScreenElement.querySelector('card-word'));
    if (isAnswerCorrect) {

      if (card.settings.enableAutomaticAudio && isFirstTimeDone) {
        card.audio.word.play();
        card.audio.word.onended = () => {
          if (card.settings.showExplanationExample && card.audio.example !== null) {
            card.audio.example.play();
            card.audio.example.onended = () => {
              if (card.settings.showSentenceExplanation && card.audio.meaning !== null) {
                card.audio.meaning.play();
              }
            };
          }
        };
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
      } else {
        learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex] = true;
      }
      updateStatusBar(learningScreenElement);

      saveDayLocalState(learningScreenElement);
      updateCard(learningScreenElement);
    } else {
      if (card.state.isFirstAnswer) {
        increaseWordErrorCount(word);
        increaseRepeatCount(word);

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
    card.state.isFirstAnswer = false;
  } else {
    if (learningScreenElement.state.mode === 'learning') {
      learningScreenElement.state.currentLearningCardIndex += 1;
    } else {
      learningScreenElement.state.currentNewWordCardIndex += 1;
    }

    card.audio.word.pause();
    card.audio.example.pause();
    card.audio.meaning.pause();

    createCard(learningScreenElement);
    difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
    difficultyButtons.forEach((element) => element.classList.remove('active'));
    setTimeout(() => difficultyButtons.forEach((element) => element.classList.add('readyToMove')), 600);
  }

  /*if (
    learningScreenElement.state.currentNewWordCardIndex ===
    learningScreenElement.settings.newWordCount &&
    learningScreenElement.state.mode === 'newWord'
  ) {
    learningScreenElement.setState('currentNewWordCardIndex', 0);
    switchCardMode(learningScreenElement);
  }

  if (
    learningScreenElement.localState.newWordProgressArr.indexOf(false) === -1 &&
    learningScreenElement.localState.learningProgressArr.indexOf(false) === -1 &&
    learningScreenElement.state.currentLearningCardIndex >= learningScreenElement.settings.wordCount
  ) {
    createResults(learningScreenElement);
  } else if (isAnswerCorrect) {
    if (learningScreenElement.settings.enableAutomaticAudio && !isFirstTimeDone) {
      const card = learningScreenElement.querySelector('card-word');
      //read
      if (card.settings.showExplanationExample) {
        //read
      }
      if (card.settings.showSentenceExplanation) {
        //read
      }
    }

    createCard(learningScreenElement);
  }*/
}
