/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
import LearningLineElement from '../../components/learningLineElement';
customElements.define('learning-line', LearningLineElement);
import TranslateOptions from '../../components/translateOptions';
customElements.define('translate-options', TranslateOptions);

import createImg from './createImg';
import createAudio from './createAudio';

export default function initLearning(cardElement) {


  //Строка ввода
  cardElement.innerHTML = "<learning-line slot='ENitem'></learning-line>";
  const learningline = cardElement.querySelector('learning-line');
  for (const prop in learningline.state) {
    learningline.setState(prop, cardElement.state[prop]);
  }

  //Отображение примера, значения и переводов
  if (cardElement.settings.showExplanationExample) {
    cardElement.insertAdjacentHTML(
      'beforeend',
      `<span slot='ENExample'>${cardElement.state.textExample}</span>
      <span slot='RUExample'>${cardElement.state.textExampleTranslate}</span>`,
    );
  }
  if (cardElement.settings.showSentenceExplanation) {
    cardElement.insertAdjacentHTML(
      'beforeend',
      `<span slot='ENMeaning'>${cardElement.state.textMeaning}</span>
      <span slot='RUMeaning'>${cardElement.state.textMeaningTranslate}</span>`,
    );
  }
  cardElement.insertAdjacentHTML(
    'beforeend',
    ` <span slot='RUitem'>${cardElement.state.wordTranslate}</span>`,
  );

  //Статус слова
  cardElement.insertAdjacentHTML(`afterbegin`, `<span slot='statusText'></span>`);
  for (let i = 0; i < 5; i += 1) {
    cardElement.insertAdjacentHTML(`afterbegin`, `<div slot='statusDot' class='dot'></div>`);
  }

  //Опции звука и переводов
  cardElement.insertAdjacentHTML(
    'beforeend',
    `  
    <img src='assets/img/icons/pause.svg' width='25px' height='25px' slot='audioHelperButton' class='stopAudioButton'>
  <img src='assets/img/icons/autoAudio.svg' width='25px' height='25px' slot='audioHelperButton' class='enableAudioButton opened'>
  <img src='assets/img/icons/settings.svg' width='25px' height='25px' slot='translateOptionsButton' class='translateOptionsButton opened'>`,
  );
  //Настрйоки перевода
  cardElement.insertAdjacentHTML(
    'beforeend',
    `<translate-options slot='translateOptions'></translate-options>`,
  );
  const translateOptions = cardElement.querySelector('[slot=translateOptions]');
  for (let prop in translateOptions.state) {
    translateOptions.setState(prop, cardElement.settings[prop]);
  }

  //Кнопки
  if (cardElement.settings.showAnswer && !cardElement.state.isDone) {
    cardElement.insertAdjacentHTML('beforeend', "<div slot='openWord' class='hovered'>Ответ</div>");
  }

  if (cardElement.settings.deleteWords) {
    cardElement.insertAdjacentHTML(
      'beforeend',
      "<div slot='deleteWord' class='hovered'>Удалить</div>",
    );
  }

  if (cardElement.state.isDone) {
    if (cardElement.state.optional.mode !== 'needToRepeat') {
      cardElement.insertAdjacentHTML(
        'beforeend',
        "<div slot='repeatWord' class='hovered'>Снова</div>",
      );
    } else {
      cardElement.insertAdjacentHTML(
        'beforeend',
        "<div slot='repeatWord'>Придется повторить</div>",
      );
    }
  }

  //Транскрипция
  if (cardElement.settings.showWordTranscription) {
    cardElement.insertAdjacentHTML(
      'beforeend',
      `<span slot='transcription'>${cardElement.state.transcription}</span>`,
    );
  }
  cardElement.insertAdjacentHTML(
    'beforeend',
    `<img src='assets/img/icons/sound.svg' slot='pronunciation'>`,
  );

  createImg(cardElement);
  createAudio(cardElement);

  cardElement.localState.isFirstCreating = false;
}
