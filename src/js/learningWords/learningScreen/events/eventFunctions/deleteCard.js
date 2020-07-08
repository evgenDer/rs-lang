/* eslint-disable no-param-reassign */
import createCard from '../../domBuilder/lightTree/createCard';
import saveDayLocalState from '../../functions/saveDayLocalState';
import { updateStatusBar } from '../../domBuilder/lightTree/createStatusBar';
import { switchDeleteModeUserWord } from '../../../../words/updateWordState';
import { createUserWord, updateUserWord } from '../../../../api/userWords';

import whatsNext from './whatsNext';
import { stopAudio } from './Audio';
import updateDifficultyButtons from '../../domBuilder/lightTree/updateDifficultyButtons';
import createResults from '../../domBuilder/lightTree/createResults';

export default function daleteCard(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const screenMode = learningScreenElement.state.mode;
  const cardMode = card.state.optional.mode;
  const wordId = card.state.id;

  if (card.state.isDone && card.state.optional.mode !== 'needToRepeat') {
    learningScreenElement.statistics.rightAnswers -= 1;
  }

  if (screenMode === 'learning') {
    learningScreenElement.localState.learningProgressArr[
      learningScreenElement.state.currentLearningCardIndex
    ] = true;
  } else if (screenMode === 'newWord') {
    learningScreenElement.localState.newWordProgressArr[
      learningScreenElement.state.currentNewWordCardIndex
    ] = true;
  } else if (screenMode === 'repeating') {
    learningScreenElement.localState.needToRepeatProgressArr[
      learningScreenElement.state.currentRepeatingCardIndex
    ] = true;
  }

  //найти другие экземпляры этого слова в повторении
  let wordClone = null;
  let wordCloneIndex = null;
  for (let i = learningScreenElement.wordArrs.needToRepeat.length - 1; i >= 0; i -= 1) {
    console.log(wordId + ' ' + learningScreenElement.wordArrs.needToRepeat[i].id);
    if (learningScreenElement.wordArrs.needToRepeat[i].id === wordId) {
      wordClone = learningScreenElement.wordArrs.needToRepeat[i];
      wordCloneIndex = i;
      break;
    }
  }
  if (wordClone !== null) {
    console.log('cloneDeleted');
    learningScreenElement.localState.needToRepeatProgressArr[wordCloneIndex] = true;
  }

  switchDeleteModeUserWord(card.state);
  updateStatusBar(learningScreenElement);
  saveDayLocalState(learningScreenElement);

  const wordDifficulty = card.state.difficulty;
  const wordOptions = card.state.optional;
  const word = {
    difficulty: wordDifficulty,
    optional: wordOptions,
  };
  if (cardMode === 'newWord') {
    createUserWord(wordId, word);
  } else {
    console.log(word);
    updateUserWord(wordId, word);
  }

  const willCreateCard = whatsNext(learningScreenElement);
  if (willCreateCard) {
    stopAudio(card);

    const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
    difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
    difficultyButtons.forEach((element) => element.classList.remove('active'));
    setTimeout(
      () => difficultyButtons.forEach((element) => element.classList.add('readyToMove')),
      600,
    );

    createCard(learningScreenElement);
    updateDifficultyButtons(learningScreenElement);
  } else {
    createResults(learningScreenElement);
  }
}
