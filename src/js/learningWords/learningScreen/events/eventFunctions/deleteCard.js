/* eslint-disable no-param-reassign */
import createCard from '../../domBuilder/lightTree/createCard';
import saveDayLocalState from '../../functions/saveDayLocalState';

import { switchDeleteModeUserWord } from '../../../../words/updateWordState';
import { createUserWord, updateUserWord } from '../../../../api/userWords';

import whatsNext from './whatsNext';

export default function daleteCard(learningScreenElement) {

  const card = learningScreenElement.querySelector('card-word');
  const screenMode = learningScreenElement.state.mode;
  const cardMode = card.state.optional.mode;

  if (screenMode === 'learning') {
    learningScreenElement.localState
      .learningProgressArr[learningScreenElement.state.currentLearningCardIndex] = true;
  } else {
    learningScreenElement.localState
      .newWordProgressArr[learningScreenElement.state.currentNewWordCardIndex] = true;
  }

  switchDeleteModeUserWord(card.state);
  saveDayLocalState(learningScreenElement);

  const wordId = card.state.id;
  const wordDifficulty = card.state.difficulty;
  const wordOptions = card.state.optional;
  const word = {
    "difficulty": wordDifficulty,
    "optional": wordOptions,
  };
  if (cardMode === 'newWord') {
    createUserWord(wordId, word);
  } else {
    console.log(word);
    updateUserWord(wordId, word);
  }

  const willCreateCard = whatsNext(learningScreenElement);
  if (willCreateCard) {
    card.audio.word.pause();
    card.audio.example.pause();
    card.audio.meaning.pause();

    const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
    difficultyButtons.forEach((element) => element.classList.remove('readyToMove'));
    difficultyButtons.forEach((element) => element.classList.remove('active'));
    setTimeout(() => difficultyButtons.forEach((element) => element.classList.add('readyToMove')), 600);

    createCard(learningScreenElement);
  }

}
