import { createElementObj } from '../../utils/create';

export default class Results {
  constructor() {
    this.gameResults = '';
  }

  generate(callbacks) {

    const titleText = createElementObj({ tagName: 'h2', textContent: 'Результаты' });
    const titleContainer = createElementObj({ tagName: 'div', classNames: 'uk-modal-header speakit_result_header', children: [titleText] });

    this.countIncorrectAnswers = createElementObj({ tagName: 'span', classNames: 'results_answers_count incorrect-answers_count' });
    const textIncorrectAnswers = createElementObj({ tagName: 'h3', classNames: 'game-results_title-answer', textContent: 'Я не знаю '});

    const titleIncorrectAnswers = createElementObj({ tagName: 'div', classNames: 'game-results_title', children: [textIncorrectAnswers, this.countIncorrectAnswers] });
    this.incorrectAnswers = createElementObj({ tagName: 'div', classNames: 'results_container-answers results_container-answers-incorrect' });

    const textCorrectAnswers = createElementObj({ tagName: 'h3', classNames: 'game-results_title-answer', textContent: 'Я знаю ' });
    this.countCorrectAnswers = createElementObj({ tagName: 'span', classNames: 'results_answers_count correct-answers_count' });
    const titleCorrectAnswers = createElementObj({ tagName: 'div', classNames: 'game-results_title', children: [textCorrectAnswers, this.countCorrectAnswers] });
    this.correctAnswers = createElementObj({ tagName: 'div', classNames: 'results_container-answers results_container-answers-correct' });

    this.answers = createElementObj({
      tagName: 'div',
      classNames: 'game-results-answers_wrapper',
      children: [ titleCorrectAnswers, this.correctAnswers, titleIncorrectAnswers, this.incorrectAnswers ],
    });

    this.returnBtn = createElementObj({ tagName: 'img', classNames: 'results_exit', attrs: [['src', './assets/img/icons/close-game.svg'], ['alt', 'закрыть']] });
    this.newGameBtn = createElementObj({ tagName: 'button', classNames: 'btn btn-results btn-new-game', textContent: 'Следующий раунд' });
    this.report = createElementObj({ tagName: 'button', classNames: 'btn btn-results btn-report', textContent: 'Создать отчет' });
    const controlBtn = createElementObj({ tagName: 'div', classNames: 'result_control-btn uk-modal-footer', children: [this.report, this.newGameBtn] });
    this.gameResultsWrapper = createElementObj({ tagName: 'div', classNames: 'game-results_wrapper', children: [this.returnBtn, titleContainer, this.answers, controlBtn] });
    this.gameResults = createElementObj({ tagName: 'div', classNames: 'game-results hidden', children: [this.gameResultsWrapper] });
    this.addListeners(callbacks);
    return this.gameResults;
  }

  addListeners(callbacks) {
    this.returnBtn.addEventListener('click', () => {
      callbacks.onClickReturn();
      this.gameResults.classList.add('hidden');
      this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
    });

    this.newGameBtn.addEventListener('click', () => {
      callbacks.onClickNewRaund();
      this.gameResults.classList.add('hidden');
      this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
    });

    this.report.addEventListener('click', () => callbacks.onClickReport());
  }

  show() {
    this.gameResults.classList.remove('hidden');
    this.gameResultsWrapper.classList.add('uk-animation-scale-up');
  }

  getContainer() {
    return this.answers;
  }

  addData(data) {
    if (data.correctAnswers) {
      this.countCorrectAnswers.textContent = data.correctAnswers.length;
      this.correctAnswers.innerHTML = '';
      data.correctAnswers.forEach((card) => {
        card.changeElementForResults();
        this.correctAnswers.append(card.getElement());
      });
    }
    if (data.incorrectAnswers) {
      this.countIncorrectAnswers.textContent = data.incorrectAnswers.length;
      this.incorrectAnswers.innerHTML = '';
      data.incorrectAnswers.forEach((card) => {
        card.changeElementForResults();
        this.incorrectAnswers.append(card.getElement());
      });
    }
  }
}
