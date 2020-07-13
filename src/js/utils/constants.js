const APP_NAME = 'RS LANG';
const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com';
const SAVANNAH_TITLE = 'С А В А Н Н А';
const SAVANNAH_TEXT = `Выбирайте подходящий перевод слова из предложенных. Управление можно осуществлять мышкой или клавиатурой.`;
const SAVANNAH_BUTTON = 'Начать';
const FETCH_WORDS = 'FETCH_WORDS';
const CHANGE_LEVEL = 'CHANGE_LEVEL';
const CHANGE_ROUND = 'CHANGE_ROUND';
const SOUND_ON = 'SOUND_ON';
const SOUND_OFF = 'SOUND_OFF';
const LEAVE_MAIN = 'LEAVE_MAIN';
const ADD_QUEUE_NUMBER = 'ADD_QUEUE_NUMBER';
const RESET_QUEUE = 'RESET_QUEUE';
const ANSWER_ERROR = 'ANSWER_ERROR';
const RESET_ERRORS = 'RESET_ERRORS';
const DATA_URL = 'https://raw.githubusercontent.com/evgenDer/rslang-data/master/';
const AUX_API_URL = 'https://dictionary.skyeng.ru/api/public/v1';

const PAGES = [
  {
    id: 'main-page',
    href: 'main.html',
    img: './assets/img/icons/home.svg',
    text: 'Главная',
  },
  {
    id: 'learning-page',
    href: 'learningWords.html',
    img: './assets/img/icons/learning.svg',
    text: 'Изучение',
  },
  {
    id: 'lvl-determination',
    href: 'determinationLevel.html',
    img: './assets/img/icons/training.svg',
    text: 'Уровень',
  },
  {
    id: 'games-page',
    href: 'games.html',
    img: './assets/img/icons/games.svg',
    text: 'Мини-игры',
  },
  {
    id: 'vocabulary-page',
    href: 'vocabulary.html',
    img: './assets/img/icons/vocabulary.svg',
    text: 'Словарь',
  },
  {
    id: 'statistics-page',
    href: 'statistics.html',
    img: './assets/img/icons/statistics.svg',
    text: 'Статистика',
  },
  {
    id: 'settings-page',
    href: 'configuration.html',
    img: './assets/img/icons/settings.svg',
    text: 'Настройки',
  },
  {
    id: 'promo-page',
    href: 'promo.html',
    img: './assets/img/icons/promo.svg',
    text: 'Промо',
  },
  {
    id: 'team-page',
    href: '#',
    img: './assets/img/icons/team.svg',
    text: 'О команде',
  },
  {
    id: 'authorization-page',
    href: 'index.html',
    img: './assets/img/icons/logout.svg',
    text: 'Выйти',
  },
];

const WORD_STATE = {
  repeating: 'needToRepeat',
  deleted: 'deleted',
  learning: 'learning',
};

const WORD_DIFFICULTLY = {
  easy: 'easy',
  normal: 'normal',
  hard: 'hard',
};

const AUDIO_B64 = 'data:audio/mp3;base64,';
const IMG_B64 = 'data:image/jpg;base64,';


export {
  PAGES, APP_NAME, BACKEND_URL, SAVANNAH_TITLE,
  SAVANNAH_TEXT, SAVANNAH_BUTTON, FETCH_WORDS, CHANGE_LEVEL, CHANGE_ROUND,
  SOUND_OFF, SOUND_ON, LEAVE_MAIN, ADD_QUEUE_NUMBER, RESET_QUEUE, ANSWER_ERROR,
  RESET_ERRORS, AUX_API_URL, WORD_STATE, AUDIO_B64, IMG_B64, DATA_URL, WORD_DIFFICULTLY,
};

