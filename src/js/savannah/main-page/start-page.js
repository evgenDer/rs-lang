import { createElement } from '../../utils/updated-create';
import heartCreator from '../../utils/heart-creator';
import dagger from '../../../img/icons/delete.svg';
import audioIcon from '../../../img/icons/sound-on.svg';
import closeGame from '../exit';
import createMainOnStartingPage from './start-button';

const createHeaderOnStartingPage = () => {
  const cross = createElement({ tagName: 'img', classNames: 'game-container__dagger-img', attrs: [['src', dagger]] });
  const iconAudio = createElement ({ tagName: 'img', classNames: 'game-container_audio', attrs: [['src', audioIcon]]});
  const heartContainer = createElement({ tagName: 'div', classNames: 'game-container__hearts hidden', children: heartCreator()});
  const headerContainer = document.querySelector('.game-container__head');
  headerContainer.prepend(cross);
  headerContainer.prepend(heartContainer);
  heartContainer.prepend(iconAudio)
  createMainOnStartingPage();;
  document.querySelector('.game-container__dagger-img').addEventListener('click', () => {
    closeGame();
  });
};


export default createHeaderOnStartingPage;
