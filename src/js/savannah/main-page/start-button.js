import { SAVANNAH_BUTTON, SAVANNAH_TEXT, SAVANNAH_TITLE } from '../../utils/constants';
import { createElement } from '../../utils/updated-create';
import onStartButtonClick from '../events/start-button.event';


const createMainOnStartingPage = () => {
  const gameButton = createElement({
    tagName: 'button', classNames: 'game-container__btn', textContent: SAVANNAH_BUTTON, onClick: [onStartButtonClick],
  });
  const gameText = createElement({ tagName: 'p', classNames: 'game-container__text', textContent: SAVANNAH_TEXT });
  const gameTitle = createElement({ tagName: 'h1', classNames: 'game-container__title', textContent: SAVANNAH_TITLE });
  const gameStartContainer = createElement({ tagName: 'div', classNames: 'game-container__start', children: [gameTitle, gameText, gameButton] });
  document.body.append(gameStartContainer);
};

export default createMainOnStartingPage;
