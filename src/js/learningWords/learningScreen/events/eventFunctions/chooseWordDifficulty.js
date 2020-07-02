import { updateUserWord } from '../../../../api/userWords';
import saveDayLocalState from '../../functions/saveDayLocalState';

export default function chooseWordDifficulty(learningScreenElement, eventTarget) {
  const newDifficulty = eventTarget.classList[1];
  const card = learningScreenElement.querySelector('card-word');
  const wordId = card.state.id;
  const wordDifficulty = card.state.difficulty;
  const wordOptions = card.state.optional;
  const word = {
    difficulty: wordDifficulty,
    optional: wordOptions,
  };
  card.state.difficulty = newDifficulty;
  updateUserWord(wordId, word);
  saveDayLocalState(learningScreenElement);
}
