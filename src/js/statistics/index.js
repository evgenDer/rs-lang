/* eslint-disable no-undef */
import {
  Statistics
} from './components/statistics';

let stat = null;

export default async function initStatistics() {
  stat = new Statistics('daily-2');

  // await stat.updateStatistics('black', true, 3);
  //  await stat.updateStatistics('red', true, 1);
  //  await stat.updateStatistics('bag', true, 4);
  //  await stat.updateStatistics('lang', false, 4);
  //  await stat.updateStatistics('dog', true, 2);
  //  await stat.updateStatistics('cat', false, 2);

  document.querySelector('.test').addEventListener('click', () => {
    stat.showGlobalStatistics();
  });

  document.querySelector('.test2').addEventListener('click', () => {
    stat.showTemporaryStatistics();
  });
};
