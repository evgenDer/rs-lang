/* eslint-disable no-param-reassign */
export default function initDayResults(dayResult) {
  dayResult.innerHTML = `
  <span slot='resultsHeader'>Еще один значимый шаг на пути к цели!</span>
  <span slot='newWordCount'>${dayResult.state.newWordCount}</span>
  <span slot='learnedWordCount'>${dayResult.state.wordCount}</span>
  <span slot='errorCount'>${dayResult.state.errorCount}</span>
  <span slot='noAnswered'>${dayResult.state.noAnsweredCount}</span>
  <div slot='buttonLeft' class='button'>Назад к словам</div>
  <div slot='buttonRight' class='button'>К статистике</div>
  `;
}
