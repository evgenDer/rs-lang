import updateStatusBar from './updateStatus';
import createImg from './createImg';
import createAudio from './createAudio';

import { updateEnableAudioHelper, updateStopAudioHelper } from '../lightTree/AudioHelpers';

export default function updateCardContent(cardElement) {
  const learningline = cardElement.querySelector('learning-line');
  const enExample = cardElement.querySelector('[slot=ENExample]');
  const enMeaning = cardElement.querySelector('[slot=ENMeaning]');
  const { word } = cardElement.state;
  const ruWord = cardElement.querySelector('[slot=RUitem]');
  const ruExample = cardElement.querySelector('[slot=RUExample]');
  const ruMeaning = cardElement.querySelector('[slot=RUMeaning]');
  const openButton = cardElement.querySelector('[slot=openWord]');
  const repeatButton = cardElement.querySelector('[slot=repeatWord]');

  //Обновляем строку ввода
  learningline.setState('isDone', cardElement.state.isDone);

  //Обновляем отображение перевода
  //Пример предложения
  if (cardElement.settings.showExplanationExample) {
    const example = cardElement.state.textExample;
    const regexpExample = /<b>\w+<\/b>/;
    let exampleUpdated = null;
    if (cardElement.state.isDone) {
      exampleUpdated = example.replace(
        regexpExample,
        `<span style='color: #61bd4f' ><b>${word}</b></span>`,
      );
    } else {
      exampleUpdated = example.replace(regexpExample, '____');
    }
    enExample.classList.add('opened');
    enExample.innerHTML = exampleUpdated;
    if (cardElement.settings.showSentenceTranslation && cardElement.state.isDone) {
      ruExample.classList.add('opened');
    } else {
      ruExample.classList.remove('opened');
    }
  }
  //Значения слова
  if (cardElement.settings.showSentenceExplanation) {
    const meaning = cardElement.state.textMeaning;
    const regexpMeaning = /<i>\w+<\/i>/;
    let meaningUpdated = null;
    if (cardElement.state.isDone) {
      meaningUpdated = meaning.replace(
        regexpMeaning,
        `<span style='color: #61bd4f'><b>${word}</b></span>`,
      );
    } else {
      meaningUpdated = meaning.replace(regexpMeaning, '____');
    }
    enMeaning.classList.add('opened');
    enMeaning.innerHTML = meaningUpdated;
    if (cardElement.settings.showSentenceTranslation && cardElement.state.isDone) {
      ruMeaning.classList.add('opened');
    } else {
      ruMeaning.classList.remove('opened');
    }
  }
  //Перевод слова
  if (
    (cardElement.settings.showNewWordTranslation &&
      cardElement.state.optional.mode === 'newWord') ||
    (cardElement.settings.showWordTranslation && cardElement.state.isDone)
  ) {
    ruWord.classList.add('opened');
  } else {
    ruWord.classList.remove('opened');
  }
  //Обновляем опции звука и отображения перевода
  updateEnableAudioHelper(cardElement);
  updateStopAudioHelper(cardElement);

  //Обновляем кнопки доп.опций
  if (cardElement.state.isDone) {
    if (openButton !== null) {
      openButton.remove();
    }
    if (repeatButton === null) {
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
    } else {
      if (cardElement.state.optional.mode !== 'needToRepeat') {
        repeatButton.classList.add('hovered');
        repeatButton.innerHTML = 'Снова';
      } else {
        repeatButton.classList.remove('hovered');
        repeatButton.innerHTML = 'Придется повторить';
      }
    }
  }

  //Обновляем статусБар
  updateStatusBar(cardElement);
}
