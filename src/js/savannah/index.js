import * as Dropdown from '../games/dropdown';
import { addGameModeSwitchClickHandler } from '../games/gameModeSwitch';
import { Statistics } from '../statistics/components/statistics';
import { createHeaderOnStartingPage }  from './gamepage';

const stat = new Statistics('Саванна');
const statBtn = document.querySelector('.game-control__btn_stat');

function addStatisticsButtonClickHandler() {
  statBtn.addEventListener('click', (event) => {
    event.preventDefault();

    stat.showGlobalStatistics(false);
  });
}

window.onload = () => {
  addGameModeSwitchClickHandler();

  Dropdown.addDropdownsEventHandlers();
  Dropdown.addActiveGameControls('savannah');
  Dropdown.enableDropdowns();

  addStatisticsButtonClickHandler();
  createHeaderOnStartingPage();
};

