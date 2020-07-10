import { createElement } from '../../utils/updated-create';
import createSpinner from '../../utils/spinner';
import createProcessTemplate from '../game-page/gamepage';

const createGameTimer = () => {
  let time = 3;

  const hearts = document.querySelector('.game-container__hearts');
  const timerText = createElement({ tagName: 'h2', classNames: 'timer__text' });
  const image = createSpinner();
  const timer = createElement({ tagName: 'div', classNames: 'timer', children: [timerText, image] });
  document.body.append(timer);
  setTimeout(() => {
    image.classList.add('opacity-one', 'show-after-click');
    timer.classList.add('show-after-click');
    const timerId = setInterval(() => {
      timerText.textContent = time;
      time -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timerId);
      timer.classList.add('hidden');
      hearts.classList.remove('hidden');
      createProcessTemplate();
      setTimeout(() => {
        timer.remove();
      }, 1000);
    }, 4000);
  }, 1000);
};

export default createGameTimer;
