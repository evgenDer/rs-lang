const APP_NAME = 'RS LANG';
const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com';
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

export { PAGES, APP_NAME, BACKEND_URL, AUX_API_URL, WORD_STATE, WORD_DIFFICULTLY, AUDIO_B64, IMG_B64, DATA_URL };
