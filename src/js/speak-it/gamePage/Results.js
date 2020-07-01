import { createElement } from '../../utils/create';

export default class Results {
  constructor() {
    this.gameResults = '';
  }

  generate(callbacks) {
    const textIncorrectAnswers = createElement({tagName: 'p', classNames: 'game-results_text', textContent: 'Ошибок'});
    this.countIncorrectAnswers = createElement({ tagName: 'span', classNames: 'results_answers_count incorrect-answers_count' });
    const titleIncorrectAnswers = createElement({tagName: 'div', classNames: 'game-results_title', children: [textIncorrectAnswers, this.countIncorrectAnswers]});
    this.incorrectAnswers = createElement({ tagName: 'div', classNames: 'results_container-answers'});

    const textCorrectAnswers = createElement({tagName: 'p', classNames: 'game-results_text', textContent: 'Знаю' });
    this.countCorrectAnswers = createElement({ tagName: 'span', classNames: 'results_answers_count correct-answers_count'});
    const titleCorrectAnswers = createElement({tagName: 'div', classNames: 'game-results_title', children: [textCorrectAnswers, this.countCorrectAnswers] });
    this.correctAnswers = createElement({ tagName: 'div', classNames: 'results_container-answers' });

    this.answers = createElement({
      tagName: 'div',
      classNames: 'game-results-answers_wrapper',
      children: [ titleIncorrectAnswers, this.incorrectAnswers, titleCorrectAnswers, this.correctAnswers ],
     });

    this.returnBtn = createElement({ tagName: 'button', classNames: 'btn btn-results btn-return-game', textContent: 'Вернуться к игре' });
    this.newGameBtn = createElement({ tagName: 'button', classNames: 'btn btn-results btn-new-game', textContent: 'Следующий раунд' });
    this.exitBtn = createElement({ tagName: 'button', classNames: 'btn btn-results btn-home', textContent: 'К списку игр' });
    const controlBtn = createElement({ tagName: 'div', classNames: 'result_control-btn', children: [ this.returnBtn, this.newGameBtn, this.exitBtn] });
    this.gameResultsWrapper = createElement({ tagName: 'div', classNames: 'game-results_wrapper', children: [this.answers, controlBtn] });
    this.gameResults = createElement({ tagName: 'div', classNames: 'game-results hidden', children: [this.gameResultsWrapper] });

    this.addListeners(callbacks);
    return this.gameResults;
  }

  addListeners(callbacks) {
    this.returnBtn.addEventListener('click', () => {
      callbacks.onReturn();
      this.gameResults.classList.add('hidden');
      this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
    });

    this.newGameBtn.addEventListener('click', () => {
      callbacks.onNewRaund();
      this.gameResults.classList.add('hidden');
      this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
    });

    this.exitBtn.addEventListener('click', callbacks.onClickHome);

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
      data.correctAnswers.forEach((card)=> {
        card.changeElementForResults();
        this.correctAnswers.append(card.getElement());
      });
    }
    if (data.incorrectAnswers) {
      this.countIncorrectAnswers.textContent = data.incorrectAnswers.length;
      this.incorrectAnswers.innerHTML = '';
      data.incorrectAnswers.forEach((card)=> {
        card.changeElementForResults();
        this.incorrectAnswers.append(card.getElement());
      });
    }
  }
}
