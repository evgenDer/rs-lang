import { createElementObj } from '../../utils/create';
import * as downloadHelper from '../../download/download';
import { errorFields, successFields } from '../../games/constants';
import { Statistics } from '../../statistics/components/statistics';
import { increaseWordErrorCount, increaseWordReferenceCount } from '../../words/updateWordState';
import { updateUserWord } from '../../api/userWords';

export default class Results {
  constructor() {
    this.gameResults = '';
    this.successFields = successFields;
    this.errorFields = errorFields;
    this.statistic = new Statistics('SpeakIt');
    this.isRoundEnd = false;
    this.correct = 0;
    this.incorrect = 0;
    this.correctAnswersCard = [];
    this.incorrectAnswersCard = [];
  }

  generate(callbacks) {

    const titleText = createElementObj({ tagName: 'h2', textContent: 'Результаты' });
    const titleContainer = createElementObj({ tagName: 'div', classNames: 'uk-modal-header speakit_result_header', children: [titleText] });
    this.incorrectAnswersCount = createElementObj({ tagName: 'span', classNames: 'results_answers_count incorrect-answers_count' });
    const textIncorrectAnswers = createElementObj({ tagName: 'h3', classNames: 'game-results_title-answer', textContent: 'Я не знаю ' });
    const titleIncorrectAnswers = createElementObj({ tagName: 'div', classNames: 'game-results_title', children: [textIncorrectAnswers, this.incorrectAnswersCount] });
    this.incorrectAnswers = createElementObj({ tagName: 'div', classNames: 'results_container-answers results_container-answers-incorrect' });
    const textCorrectAnswers = createElementObj({ tagName: 'h3', classNames: 'game-results_title-answer', textContent: 'Я знаю ' });
    this.correctAnswersCount = createElementObj({ tagName: 'span', classNames: 'results_answers_count correct-answers_count' });
    const titleCorrectAnswers = createElementObj({ tagName: 'div', classNames: 'game-results_title', children: [textCorrectAnswers, this.correctAnswersCount] });
    this.correctAnswers = createElementObj({ tagName: 'div', classNames: 'results_container-answers results_container-answers-correct' });

    this.answers = createElementObj({
      tagName: 'div',
      classNames: 'game-results-answers_wrapper',
      children: [titleCorrectAnswers, this.correctAnswers, titleIncorrectAnswers, this.incorrectAnswers],
    });

    this.closeBtn = createElementObj({ tagName: 'img', classNames: 'results_exit', attrs: [['src', './assets/img/icons/close-game.svg'], ['alt', 'закрыть']] });
    this.newGameBtn = createElementObj({ tagName: 'button', classNames: 'speak-it_btn btn-results btn-new-game', textContent: 'Следующий раунд' });
    this.report = createElementObj({ tagName: 'button', classNames: 'speak-it_btn btn-results btn-report', textContent: 'Создать отчет' });
    const controlBtn = createElementObj({ tagName: 'div', classNames: 'result_control-btn uk-modal-footer', children: [this.report, this.newGameBtn] });
    this.gameResultsWrapper = createElementObj({ tagName: 'div', classNames: 'game-results_wrapper', children: [this.closeBtn, titleContainer, this.answers, controlBtn] });
    this.gameResults = createElementObj({ tagName: 'div', classNames: 'game-results hidden', children: [this.gameResultsWrapper] });
    this.addListeners(callbacks);
    return this.gameResults;
  }

  addListeners(callbacks) {
    this.closeBtn.addEventListener('click', () => {
      this.onClickClose(callbacks);
    });

    this.gameResults.addEventListener('click', (event) => {
      if (event.target === this.gameResults) {
        this.onClickClose(callbacks);
      }
    });

    this.newGameBtn.addEventListener('click', () => this.onClickNewRaund());

    this.report.addEventListener('click', () => {
      this.addInformationToReport();
      this.errorFields.push('\r\n\r\n');
      const text = `Отчет по игре "Speak it"\r\n\r\n${this.errorFields.join('\r\n')}${this.successFields.join('\r\n')}`;
      downloadHelper.download(`speakIt-report_${new Date().toISOString()}.txt`, text);
    });
  }

  onClickClose(callbacks) {
    if (this.isRoundEnd) {
      this.isRoundEnd = false;
      this.onClickNewRaund();
    } else {
      callbacks();
      this.gameResults.classList.add('hidden');
      this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
    }
  }

  onClickNewRaund() {
    this.statistic.updateGameStatistics(this.correct, this.incorrect, 0);
    this.updateUserWordState();
    const customEvent = new CustomEvent('speakitNewRaund');
    document.dispatchEvent(customEvent);
    this.gameResults.classList.add('hidden');
    this.gameResultsWrapper.classList.remove('uk-animation-scale-up');
  }

  updateUserWordState() {
    this.correctAnswersCard.forEach((card) => {
      const currentUserData = card.getUserWordData();
      if (currentUserData) {
        increaseWordReferenceCount(currentUserData);
        updateUserWord(card.getWordId(), currentUserData);
      }
    });
    this.incorrectAnswersCard.forEach((card) => {
      const currentUserData = card.getUserWordData();
      if (currentUserData) {
        increaseWordErrorCount(currentUserData);
        updateUserWord(card.getWordId(), currentUserData);
      }
    });
  }

  show() {
    this.gameResults.classList.remove('hidden');
    this.gameResultsWrapper.classList.add('uk-animation-scale-up');
  }

  getContainer() {
    return this.answers;
  }

  addDataByTypeOfResponse(data, nameTypeAnswer) {
    this[nameTypeAnswer] = data.length;
    this[`${nameTypeAnswer}AnswersCount`].textContent = this[nameTypeAnswer];
    this[`${nameTypeAnswer}Answers`].innerHTML = '';
    data.forEach((card) => {
      card.changeElementForResults();
      this[`${nameTypeAnswer}Answers`].append(card.getElement());
    });
  }

  addInformationToReport() {
    this.correctAnswersCard.forEach((card) => {
      this.successFields = successFields;
      this.successFields.push(`${card.getWord()} - ${card.getTranscription()} - ${card.getTranslate()}`);
    });
    this.incorrectAnswersCard.forEach((card) => {
      this.errorFields = errorFields;
      this.errorFields.push(`${card.getWord()} - ${card.getTranscription()} - ${card.getTranslate()}`);
    });
  }

  addData(data, isRoundEnd) {
    this.isRoundEnd = isRoundEnd;
    this.correctAnswersCard = data.correctAnswers;
    this.incorrectAnswersCard = data.incorrectAnswers;
    this.addDataByTypeOfResponse(this.correctAnswersCard, 'correct');
    this.addDataByTypeOfResponse(this.incorrectAnswersCard, 'incorrect');
  }
}
