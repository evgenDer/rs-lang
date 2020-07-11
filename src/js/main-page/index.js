import dayStat from './dayStat';

const learnedWords = document.getElementById('learned-words');
const allWords = document.getElementById('all-words');
const languageStatBar = document.getElementById('language-stat_bar');

const dayLearnedWords = document.getElementById('day-learned-words');
const dayAllWords = document.getElementById('day-all-words');
const todayPlanBar = document.getElementById('today-stat_plan-bar');

const maxDayLearnedWords = document.getElementById('max-day-learned-words');
const maxAllWords = document.getElementById('max-all-words');
const todayMaxBar = document.getElementById('today-stat_max-bar');

const wordsPracticed = document.getElementById('words-practiced');
const correctRepeats = document.getElementById('correct-repeats');
const newWords = document.getElementById('new-words');
const bestStreak = document.getElementById('best-streak');

export async function updPageContent() {
  await dayStat.init()
  updateLanguageStatBar(dayStat.state.wordCount, 3600);
  const dayLearnedWords = dayStat.state.dayLearnedWords > dayStat.state.dayWordPlanCount
    ? dayStat.state.dayWordPlanCount : dayStat.state.dayLearnedWords;
  updateTodayPlanBar(dayLearnedWords, dayStat.state.dayWordPlanCount);
  const daylearnedNewWords = dayStat.state.daylearnedNewWords > dayStat.state.dayNewWordPlanCount
    ? dayStat.state.dayNewWordPlanCount : dayStat.state.daylearnedNewWords;
  updateTodayMaxBar(daylearnedNewWords, dayStat.state.dayNewWordPlanCount)
  updateWordsPracticed(dayStat.state.dayLearnedWords);
  let correctRepeats = Math.floor(100 * dayStat.state.rightCount / dayStat.state.dayLearnedWords) || 0;
  updateCorrectRepeats(correctRepeats);
  updateNewWords(dayStat.state.daylearnedNewWords);
  updateBestStreak(dayStat.state.bestSeries);
  document.addEventListener('click', () => {

    if (event.target.closest('#start-learning-btn') !== null) {
      window.location.href = 'learningWords.html';
    }
  })
}


export function updateLanguageStatBar(learned, all = 3600) {

  learnedWords.textContent = +learned;
  allWords.textContent = +all;
  languageStatBar.value = +learned;
  languageStatBar.max = +all;
}

export function updateTodayPlanBar(learned, all = 50) {
  dayLearnedWords.textContent = +learned;
  dayAllWords.textContent = +all;
  todayPlanBar.value = +learned;
  todayPlanBar.max = +all;
}

export function updateTodayMaxBar(learned, max = 70) {
  maxDayLearnedWords.textContent = +learned;
  maxAllWords.textContent = +max;
  todayMaxBar.value = +learned;
  todayMaxBar.max = +max;
}

export function updateTodayBars(learned) {
  updateTodayPlanBar(learned);
  updateTodayMaxBar(learned);
}

export function updateWordsPracticed(val) {
  wordsPracticed.textContent = +val;
}

export function updateCorrectRepeats(val) {
  correctRepeats.textContent = +val;
}

export function updateNewWords(val) {
  newWords.textContent = +val;
}

export function updateBestStreak(streak) {
  bestStreak.textContent = +streak;
}
