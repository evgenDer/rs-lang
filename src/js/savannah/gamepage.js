import { createElement } from '../utils/create';
import heart from '../../img/icons/heart.svg';
import note from '../../img/icons/note.svg';

const heartCreator = () => {
  const hearts = [];
  for (let i = 0; i < 5; i += 1) {
    const heartImg = createElement('img', 'process__heart', '', [['src', heart]]);
    hearts.push(heartImg);
  }
  return hearts;
};

const createHeader = () => {
  const noteImg = createElement('img', 'process__note-img', '', [['src', note]]);
  const noteContainer = createElement('div', 'process__note', [noteImg]);
  const heartContainer = createElement('div', 'process__hearts', heartCreator());
  const header = createElement('div', 'process__header', [noteContainer, heartContainer]);
  const process = createElement('section', 'process', [header]);
  const gameContainer = document.querySelector('.game-container');
  gameContainer.append(process);
  setTimeout(() => {
    process.classList.add('show-after-click');
  }, 1000);
};

export default createHeader;
