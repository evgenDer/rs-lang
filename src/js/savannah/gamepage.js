import store from './store/store';
import { createElement } from '../utils/updated-create';
import heart from '../../img/icons/heart.svg';
import note from '../../img/icons/note.svg';

import crystal from '../../img/crystal.png';


const heartCreator = () => {
  const hearts = [];
  for (let i = 0; i < 5; i += 1) {
    const heartImg = createElement({ tagName: 'img', classNames: 'process__heart', attrs: [['src', heart]] });
    hearts.push(heartImg);
  }
  return hearts;
};

const rnd = (max = 20, rndTrash = []) => {
  const number = Math.floor(Math.random() * max);
  return rndTrash.includes(number) ? rnd(rndTrash) : number;
};

const createFooter = () => {
  const img = createElement({ tagName: 'img', classNames: 'crystal', attrs: [['src', crystal]] });
  const imgContainer = createElement({ tagName: 'div', children: [img] });
  const footer = createElement({ tagName: 'div', classNames: 'process__footer', children: [imgContainer] });
  return footer;
};

const createMain = (requestedWords) => {
  const words = [];
  for (let i = 0; i < 4; i += 1) {
    const number = rnd();
    const word = createElement({ tagName: 'h3', textContent: requestedWords[number].word });
    words.push(word);
  }
  const generalWord = words[rnd(4)].textContent;
  const answers = createElement({ tagName: 'div', classNames: 'process__main', children: words });
  return { main: answers, generalWord };
};


const createHeader = (word) => {
  const noteImg = createElement({ tagName: 'img', classNames: 'process__note-img', attrs: [['src', note]] });
  const noteContainer = createElement({ tagName: 'div', classNames: 'process__note', children: [noteImg] });
  const generalWord = createElement({ tagName: 'div', classNames: 'process__general-word', textContent: word });
  const heartContainer = createElement({ tagName: 'div', classNames: 'process__hearts', children: heartCreator() });
  const header = createElement({ tagName: 'div', classNames: 'process__header', children: [noteContainer, generalWord, heartContainer] });
  return header;
};

const createProcessTemplate = () => {
  const { words } = store.getState();

  const { main, generalWord } = createMain(words);
  const header = createHeader(generalWord);
  const footer = createFooter();
  const process = createElement({ tagName: 'section', classNames: 'process h-100', children: [header, main, footer] });
  const gameContainer = document.querySelector('.game-container');
  gameContainer.append(process);
  setTimeout(() => {
    process.classList.add('show-after-click');
  }, 1000);
};

export default createProcessTemplate;
