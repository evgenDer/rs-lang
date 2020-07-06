/* eslint-disable no-undef */
import {
  Statistics
} from './components/statistics';

export default async function initStatistics() {
  const stat = new Statistics('daily-2');

  await stat.showDateTimeStatisitcsChart();
  await stat.showPercentToAllChart();
};
