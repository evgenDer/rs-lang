/* eslint-disable no-param-reassign */
export default function initDayResults(dayResult) {
  dayResult.innerHTML = `
  <span slot='resultsHeader'>Еще один значимый шаг на пути к цели!</span>
  <span slot='newWordCount'>${dayResult.state.newWordCount}</span>
  <span slot='learnedWordCount'>${dayResult.state.wordCount}</span>
  <span slot='rightAnswers'>${dayResult.state.rightAnswers}%</span>
  <span slot='bestSeries'>${dayResult.state.bestSeries}</span>
  <div slot='buttonLeft' class='button'>Получить больше слов!</div>
  <div slot='buttonRight' class='button'>К статистике</div>
  `;
}
