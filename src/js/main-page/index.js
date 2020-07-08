/* eslint-disable no-param-reassign */
import { getSettings } from '../api/settings';
import { getAllUserWords } from '../api/userWords';


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

const determineLvlBtn = document.getElementById('determine-lvl-btn');
const startLearningBtn = document.getElementById('start-learning-btn');


const NORMALIZE = 50;

const getBarValue = (part, all) => +part < +all / NORMALIZE ? +all / NORMALIZE : +part;

export function updateLanguageStatBar(learned, all = 3600) {
  const num = getBarValue(learned, all);
  learnedWords.textContent = learned;
  allWords.textContent = all;
  languageStatBar.value = +num;
  languageStatBar.max = +all;
}

export function updateTodayPlanBar(learned, all = 50) {
  const num = getBarValue(learned, all);
  dayLearnedWords.textContent = learned;
  dayAllWords.textContent = all;
  todayPlanBar.value = +num;
  todayPlanBar.max = +all;
}

export function updateTodayMaxBar(learned, max = 70) {
  const num = getBarValue(learned, max);
  maxDayLearnedWords.textContent = learned;
  maxAllWords.textContent = max;
  todayMaxBar.value = +num;
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

export function addMainPageClickHandlers() {
  determineLvlBtn.addEventListener('click', () => {
    // later
  });
  startLearningBtn.addEventListener('click', () => {
    document.location.href = 'learningWords.html';
  });
}

export async function updateMainPage() {
  const settings = await getSettings();
  const planDay = settings.optional.maxNewWordsPerDay;
  const maxDay = settings.optional.maxCardsWithWordsPerDay;

  const userWordsData = await getAllUserWords();
  const allUserWordsAmnt = userWordsData.length;

  updateLanguageStatBar(allUserWordsAmnt);
  updateTodayPlanBar(5, planDay);
  updateTodayMaxBar(5, maxDay);
}
