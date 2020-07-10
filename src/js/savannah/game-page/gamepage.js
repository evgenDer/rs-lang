import { createElement } from '../../utils/updated-create';
import createMain from './main';
import createFooter from './footer';
import Game from '../Game';
import { getGameMode } from '../../games/gameModeSwitch';
import { getCurrentLevel, getCurrentRound } from '../../games/dropdown';

const createProcessTemplate = () => {
  const { answers } = createMain();
  const footer = createFooter();
  const process = createElement({ tagName: 'section', classNames: 'process', children: [answers, footer] });

  document.body.append(process);
  const game = new Game(getGameMode(), getCurrentLevel(), getCurrentRound() );
  game.startGame();
  setTimeout(() => {
    process.classList.add('show-after-click');
  }, 1000);
  };

export default createProcessTemplate;
