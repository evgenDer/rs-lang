/* eslint-disable no-param-reassign */
import createCard from '../../domBuilder/lightTree/createCard';
import saveDayLocalState from '../../functions/saveDayLocalState';

import { switchDeleteModeUserWord } from '../../../../words/updateWordState';
import { createUserWord, updateUserWord } from '../../../../api/userWords';

export default function daleteCard(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const screenMode = learningScreenElement.state.mode;
  const cardMode = card.state.optional.mode;
  let cardIndex = 0;

  console.log(learningScreenElement.state)
  if (screenMode === 'learning') {
    cardIndex = learningScreenElement.state.currentLearningCardIndex;
    learningScreenElement.localState.learningProgressArr[cardIndex] = true;
    learningScreenElement.state.currentLearningCardIndex += 1;
  } else {
    cardIndex = learningScreenElement.state.currentNewWordCardIndex;
    learningScreenElement.localState.newWordProgressArr[cardIndex] = true;
    learningScreenElement.state.currentNewWordCardIndex += 1;
  }

  console.log(learningScreenElement.state)
  switchDeleteModeUserWord(card.state);
  saveDayLocalState(learningScreenElement);

  const wordId = card.state.id;
  const wordDifficulty = card.state.difficulty;
  const wordOptions = card.state.optional;
  const word = {
    "difficulty": wordDifficulty,
    "optional": wordOptions,
  };
  console.log(cardMode);
  if (cardMode === 'newWord') {
    createUserWord(wordId, word);
  } else {
    console.log(word);
    updateUserWord(wordId, word);
  }

  createCard(learningScreenElement);
}
