import { Statistics } from './components/statistics';

function initStatistics() {
  const statistics = new Statistics('standard');

  const promise = new Promise((resolve) => {
    resolve(statistics.updateStatistics('word', true, 1));
  });

  promise.then((result) => console.log(result));
}

export default initStatistics();
