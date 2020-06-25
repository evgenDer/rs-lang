import { createElement } from '../utils/create';
import { getGameStatistics, setGameStatistics } from '../utils/storage';
import Dropdoun from './Dropdown';

export default class StartScreen {
  constructor() {
    this.startScreen = '';
  }

  generateStartScreen() {
    const localData = getGameStatistics('speakitStatistic');
    const numberLevels = 6;
    const numberRound = 60;
    this.levels = new Dropdoun('Уровень', numberLevels, localData.level);
    this.rounds = new Dropdoun('Раунд', numberRound, localData.page);
    const gameControl = createElement({ tagName: 'div', classNames: 'game-control', children: [this.levels.generateDropdoun(), this.rounds.generateDropdoun() ] });

    const title = createElement({ tagName: 'h2', classNames: 'intro__title', textContent: 'SPEAKIT' });
    const info = createElement({ tagName: 'p', classNames: 'intro__info', textContent: 'Click on the words to hear them sound.<br>Click on the button and speak the words into the microphone.' });
    this.startBtn = createElement({ tagName: 'button', classNames: 'btn btn-start-game', textContent: 'Start' });
    const intro = createElement({ tagName: 'div', classNames: 'intro', children: [ title, info, this.startBtn] });
    this.startScreen = createElement({ tagName: 'div', classNames: 'start-screen', children: [gameControl, intro] });

    this.addListeners();
    return this.startScreen;
  }

  addListeners() {
    this.startBtn.addEventListener('click', () => {
      this.startScreen.classList.add('hidden');
      const data =  { level: this.levels.getNumCurrentItem(), page: this.rounds.getNumCurrentItem() };
      setGameStatistics(data);
      const customEvent = new CustomEvent('startSpeakit');
      document.dispatchEvent(customEvent);
    });
  }
}
