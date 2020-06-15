import path from 'path';
import { PAGES, APP_NAME } from '../utils/constants';
import { createElement } from '../utils/create';


function closeNavigationMenu() {
  const nav = document.querySelector('.navigation');
  const navBtn = document.querySelector('.hamburger__line');

  nav.classList.add('navigation_hidden');
  navBtn.classList.remove('hamburger__line_active');
}


function addNavigationClickHandler() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.navigation');
  const navBtn = document.querySelector('.hamburger__line');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('navigation_hidden');
    navBtn.classList.toggle('hamburger__line_active');
  });

  document.addEventListener('click', ({ target }) => {
    if (!nav.contains(target) && (!hamburger.contains(target))) {
      closeNavigationMenu();
    }
  });
}


export function defineActivePage() {
  const activePageId = document.body.getAttribute('id');
  const activePageNum = PAGES.map((page) => page.id).indexOf(activePageId);
  return activePageNum;
}


function generateNavigation() {
  const activePageNum = defineActivePage();

  const hambLine = createElement('span', 'hamburger__line');
  const hambrLineContainer = createElement('div', 'hamburger', [hambLine]);
  const hamb = createElement('div', 'header__hamburger', [hambrLineContainer]);

  const list = [];
  PAGES.forEach((page, num) => {
    const icon = createElement('img', '', [], [['src', page.img], ['alt', path.basename(page.img, '.svg')]]);
    const anchor = createElement('a', '', [icon], [['href', page.href]], page.text);

    const link = createElement('li', 'navigation__link', [anchor]);
    if (num === activePageNum) {
      link.classList.add('navigation__link_active');
    }
    list.push(link);
  });

  const navList = createElement('ul', 'navigation navigation_hidden', list);

  const navigation = createElement('nav', 'header__navigation', [navList, hamb]);
  return navigation;
}


export function addHeaderToPage() {
  if (defineActivePage() === PAGES.length - 1) {
    // autorization page does not have navigation
    return;
  }

  const navigation = generateNavigation();
  const aligner = createElement('div', 'header__aligner');

  const logo = createElement('h1', 'logo', [], [], APP_NAME);
  const logoContainer = createElement('div', 'header__logo', [logo]);

  const wrapper = createElement('div', 'wrapper header__wrapper', [navigation, logoContainer, aligner]);

  const header = createElement('header', 'header', [wrapper]);
  document.body.prepend(header);

  addNavigationClickHandler();
}
