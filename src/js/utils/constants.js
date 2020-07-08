const APP_NAME = 'RS LANG';
const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com';
const SAVANNAH_TITLE = 'С А В А Н Н А';
const SAVANNAH_TEXT = `Тренировка Саванна развивает
словарный запас. Чем больше слов ты знаешь, тем больше очков
опыта получишь.`;
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

const PAGES = [
  {
    id: 'main-page',
    href: 'main.html',
    img: './assets/img/icons/home.svg',
    text: 'Главная',
  },
  {
    id: 'learning-page',
    href: '#',
    img: './assets/img/icons/learning.svg',
    text: 'Изучение',
  },
  {
    id: 'training-page',
    href: '#',
    img: './assets/img/icons/training.svg',
    text: 'Тренировка',
  },
  {
    id: 'games-page',
    href: 'games.html',
    img: './assets/img/icons/games.svg',
    text: 'Мини-игры',
  },
  {
    id: 'dictionary-page',
    href: 'dictionary.html',
    img: './assets/img/icons/dictionary.svg',
    text: 'Словарь',
  },
  {
    id: 'statistics-page',
    href: '#',
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
    href: '#',
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


export {
  PAGES, APP_NAME, BACKEND_URL, SAVANNAH_TITLE,
  SAVANNAH_TEXT, SAVANNAH_BUTTON, FETCH_WORDS, CHANGE_LEVEL, CHANGE_ROUND,
  SOUND_OFF, SOUND_ON, LEAVE_MAIN, ADD_QUEUE_NUMBER, RESET_QUEUE, ANSWER_ERROR,
  RESET_ERRORS,
};
