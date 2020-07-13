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

  const rightAnswerPercent =
    Math.floor(
      (100 * learningScreenElement.statistics.rightAnswers) / (newWordCount + learnedWordCount),
    ) || 0;
  const bestSeries = learningScreenElement.statistics.longestRightAnswerSeries;

  console.log(newWordCount);
  console.log(learnedWordCount);
  console.log(rightAnswerPercent);
  console.log(bestSeries);

  results.setState('wordCount', newWordCount + learnedWordCount);
  results.setState('newWordCount', +newWordCount);
  results.setState('rightAnswers', +rightAnswerPercent);
  results.setState('bestSeries', +bestSeries);

  console.log(results.state.wordCount);
  console.log(results.state.newWordCount);
  console.log(results.state.rightAnswers);
  console.log(results.state.bestSeries);
}
