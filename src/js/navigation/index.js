import path from 'path';
import { PAGES, APP_NAME } from '../utils/constants';
import { createElement } from '../utils/create';
import { removeUserId } from '../utils/storage';


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

  const hambLine = createElement({ tagName: 'span', classNames: 'hamburger__line' });
  const hambrLineContainer = createElement({ tagName: 'div', classNames: 'hamburger', children: [hambLine] });
  const hamb = createElement({ tagName: 'div', classNames: 'header__hamburger', children: [hambrLineContainer] });

  const list = [];
  PAGES.forEach((page, num) => {
    const icon = createElement({ tagName: 'img', attrs: [['src', page.img], ['alt', path.basename(page.img, '.svg')]] });
    const title = createElement({ tagName: 'span', textContent: page.text });
    const anchor = createElement({ tagName: 'a', children: [icon, title], attrs: [['href', page.href]] });
    if (num === PAGES.length - 1) {
      anchor.onclick = () => {
        removeUserId();
      };
    }

    const link = createElement({ tagName: 'li', classNames: 'navigation__link', children: [anchor] });
    if (num === activePageNum) {
      link.classList.add('navigation__link_active');
    }
    list.push(link);
  });

  const navList = createElement({ tagName: 'ul', classNames: 'navigation navigation_hidden', children: list });

  const navigation = createElement({ tagName: 'nav', classNames: 'header__navigation', children: [navList, hamb] });
  return navigation;
}


export function addHeaderToPage() {
  if (defineActivePage() === PAGES.length - 1) {
    // autorization page does not have navigation
    return;
  }

  const navigation = generateNavigation();
  const aligner = createElement({ tagName: 'div', classNames: 'header__aligner' });

  const logo = createElement({ tagName: 'h1', classNames: 'logo', textContent: APP_NAME });
  const logoContainer = createElement({ tagName: 'div', classNames: 'header__logo', children: [logo] });

  const wrapper = createElement({ tagName: 'div', classNames: 'wrapper header__wrapper', children: [navigation, logoContainer, aligner] });

  const header = createElement({ tagName: 'header', classNames: 'header', children: [wrapper] });
  document.body.prepend(header);

  addNavigationClickHandler();
}
