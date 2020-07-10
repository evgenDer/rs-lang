/* eslint-disable no-undef */
import {
  Statistics
} from './components/statistics';

export default async function initStatistics() {
  const stat = new Statistics('Learning');

  await stat.showDateTimeStatisitcsChart();
  await stat.showPercentToAllChart();
};
