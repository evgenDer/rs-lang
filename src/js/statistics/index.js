/* eslint-disable no-undef */
import {
  Statistics
} from './components/statistics';

export default async function initStatistics() {
  const stat = new Statistics('daily-2');

  await stat.updateLearningStatistics(14, 5, 9);

  await stat.showDateTimeStatisitcsChart();
};
