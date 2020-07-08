import createMain from '../game-page./main';
import createHeader from '../game-page./header';
import store from '../store/store';
import { errorsAction } from '../store/action-creators/errors';
import goToCrystal from './transform';
import changeAnimation from './fall-anumation';
import errHeart from '../../../img/icons/heart-minus.png';


const removeContainers = () => {
  document.querySelector('.process__header').remove();
  document.querySelector('.process__main').remove();
};


const correctAnswer = (e) => {
  const box = document.querySelector('.process__general-word');
  const process = document.querySelector('.process');
  const { dublicate } = store.getState();
  const { answer } = e.target.dataset;

  if (dublicate.length === 20) {
    //  game end
    // you are winner
    // eslint-disable-next-line no-undef
    UIkit.modal.confirm('Вы успешно прошли прошли раунд!<br>Продолжить?').then(() => {
    }, () => {
      console.log('Rejected.');
    });
    removeContainers();
    return;
  }

  if (answer !== box.dataset.answer && !e.target.classList.contains('process__answer')) {
    // for another click
    return;
  }

  if (answer !== box.dataset.answer && e.target.classList.contains('process__answer')) {
    const { errors } = store.getState();
    box.classList.add('bounce');
    document.querySelectorAll('.game-container__heart')[errors].style.backgroundImage = `url(${errHeart}`;
    store.dispatch(errorsAction());

    if (errors === 4) {
      setTimeout(() => {
        removeContainers();
      }, 1000);
      return;
    }
  }

  if (answer === box.dataset.answer && e.target.classList.contains('process__answer')) {
    const crystal = document.querySelector('.crystal');
    const { x, y } = box.getBoundingClientRect();
    changeAnimation(x, y, box);
    goToCrystal(crystal, box);
    box.textContent = '|';
  }

  // need check

  const { main, generalWord } = createMain();
  const header = createHeader(generalWord);

  setTimeout(() => {
    removeContainers();
    process.prepend(header, main);
  }, 1500);
};


const checkAnswer = () => {
  document.addEventListener('click', correctAnswer);
};

export default checkAnswer;
