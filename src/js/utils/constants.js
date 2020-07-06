const APP_NAME = 'RS LANG';
const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com';
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

const WORD_STATE = {
  repeating: 'needToRepeat',
  deleted: 'deleted',
  learning: 'learning',
};


const AUDIO_B64 = 'data:audio/mp3;base64,';
const IMG_B64 = 'data:image/jpg;base64,';


export { PAGES, APP_NAME, BACKEND_URL, AUX_API_URL, WORD_STATE, AUDIO_B64, IMG_B64 };
