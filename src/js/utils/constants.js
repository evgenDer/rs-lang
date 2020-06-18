const APP_NAME = 'RS LANG';
const BACKEND_URL = 'https://afternoon-falls-25894.herokuapp.com';
const SAVANNAH_TITLE = 'С А В А Н Н А';
const SAVANNAH_TEXT = `Тренировка Саванна развивает
словарный запас. Чем больше слов ты знаешь, тем больше очков
опыта получишь.`;
const SAVANNAH_BUTTON = 'Начать';

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
    href: '#',
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
    href: 'authorization.html',
    img: './assets/img/icons/logout.svg',
    text: 'Выйти',
  },
];


export {
  PAGES, APP_NAME, BACKEND_URL, SAVANNAH_TITLE, SAVANNAH_TEXT, SAVANNAH_BUTTON,
};
