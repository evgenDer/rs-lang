import { WORD_STATE } from '../../../../utils/constants';

export default function createResults(learningScreenElement) {
  document.body.insertAdjacentHTML('beforeend', '<learning-results></learning-results>');
  const results = document.querySelector('learning-results');

  const newWordCount =
    learningScreenElement.wordArrs.newWords.filter(
      (element) => element.optional.mode !== WORD_STATE.deleted,
    ).length || 0;
  const learnedWordCount =
    learningScreenElement.wordArrs.learnedWords.filter(
      (element) => element.optional.mode !== WORD_STATE.deleted,
    ).length || 0;

  let rightAnswerPercent = 0;
  if (newWordCount + learnedWordCount > 0) {
    rightAnswerPercent =
      Math.floor(
        (100 * learningScreenElement.statistics.rightAnswers) / (newWordCount + learnedWordCount),
      ) || 0;
  }
  const bestSeries = learningScreenElement.statistics.longestRightAnswerSeries;

  results.setState('wordCount', newWordCount + learnedWordCount);
  results.setState('newWordCount', +newWordCount);
  results.setState('rightAnswers', +rightAnswerPercent);
  results.setState('bestSeries', +bestSeries);
}
