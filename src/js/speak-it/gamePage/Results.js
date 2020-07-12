import { createElementObj } from '../../utils/create';
import * as downloadHelper from '../../download/download';
import { errorFields, successFields } from '../../games/constants';
import { Statistics } from '../../statistics/components/statistics';

export default class Results {
  constructor() {
    this.gameResults = '';
    this.successFields = successFields;
    this.errorFields = errorFields;
    this.statistic = new Statistics('SpeakIt');
    this.isRoundEnd = false;
    this.correct = 0;
    this.incorrect = 0;
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
      if (this.isRoundEnd) {
        this.isRoundEnd = false;
        this.onClickNewRaund();
      } else {
        callbacks.onClickReturn();
        this.gameResults.classList.add('hidden');
        this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
      }

    });

    this.newGameBtn.addEventListener('click', () => this.onClickNewRaund());

    this.report.addEventListener('click', () => {
        this.errorFields.push('\r\n\r\n');

        const text = `Отчет по игре "Speak it"\r\n\r\n${this.errorFields.join('\r\n')}${this.successFields.join('\r\n')}`;
        downloadHelper.download(`speakIt-report_${new Date().toISOString()}.txt`, text);
    });
  }

  onClickNewRaund() {
    this.statistic.updateGameStatistics(this.correct, this.incorrect, 0);
    const customEvent = new CustomEvent('speakitNewRaund');
    document.dispatchEvent(customEvent);
    this.gameResults.classList.add('hidden');
    this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
  }

  show() {
    this.gameResults.classList.remove('hidden');
    this.gameResultsWrapper.classList.add('uk-animation-scale-up');
  }

  getContainer() {
    return this.answers;
  }

  addData(data, isRoundEnd) {
    this.isRoundEnd = isRoundEnd;
    if (data.correctAnswers) {
      this.correct = data.correctAnswers.length;
      this.countCorrectAnswers.textContent = this.correct;
      this.correctAnswers.innerHTML = '';
      data.correctAnswers.forEach((card) => {
        card.changeElementForResults();
        this.correctAnswers.append(card.getElement());
        this.successFields = successFields;
        this.successFields.push(`${card.getWord()} - ${card.getTranscription()} - ${card.getTranslate()}`);
      });
    }
    if (data.incorrectAnswers) {
      this.incorrect = data.incorrectAnswers.length;
      this.countIncorrectAnswers.textContent = this.incorrect;
      this.incorrectAnswers.innerHTML = '';
      data.incorrectAnswers.forEach((card) => {
        card.changeElementForResults();
        this.incorrectAnswers.append(card.getElement());
        this.errorFields = errorFields;
        this.errorFields.push(`${card.getWord()} - ${card.getTranscription()} - ${card.getTranslate()}`);
      });
    }
  }
}
