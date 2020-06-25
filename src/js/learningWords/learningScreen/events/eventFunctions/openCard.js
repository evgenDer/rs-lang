/* eslint-disable no-param-reassign */
import updateCard from '../../domBuilder/lightTree/updateCard';
import saveDayLocalState from '../../functions/saveDayLocalState';
import addWordNeedToRepeat from './addWordNeedToRepeat';
import { createUserWord, updateUserWord } from '../../../../api/userWords';
import { openCardUpdate } from '../../../../words/updateWordState';

export default function openCard(learningScreenElement) {
  const difficultyButtons = learningScreenElement.querySelectorAll('[slot=difficultyButton]');
  const card = learningScreenElement.querySelector('card-word');
  const cardMode = card.state.optional.mode;
  const screenMode = learningScreenElement.state.mode;
  const { currentNewWordCardIndex } = learningScreenElement.state;
  const { currentLearningCardIndex } = learningScreenElement.state;

  if (screenMode === 'learning') {
    learningScreenElement.localState.learningProgressArr[currentLearningCardIndex] = true;
  } else {
    learningScreenElement.localState.newWordProgressArr[currentNewWordCardIndex] = true;
  }

  openCardUpdate(card.state);
  addWordNeedToRepeat(learningScreenElement);

  if (card.settings.enableAutomaticAudio) {
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
    updateUserWord(wordId, word);
  }
  saveDayLocalState(learningScreenElement);

  difficultyButtons.forEach((element) => element.classList.add('active'));
  updateCard(learningScreenElement);
}
