/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
import LearningLineElement from '../../components/learningLineElement';
customElements.define('learning-line', LearningLineElement);

import updateStatusBar from './updateStatus';
import createImg from './createImg';
import createAudio from './createAudio';

export default function initLearning(cardElement, isJustUpdated = false) {


  console.log(cardElement.state);
  if (isJustUpdated) {

    updateStatusBar(cardElement);
    cardElement.querySelector('learning-line').setState('isDone', cardElement.state.isDone);
    cardElement.querySelector('learning-line').setState('isDeleted', cardElement.state.isDeleted);
  } else {

    cardElement.innerHTML = "<learning-line slot='ENitem'></learning-line>";
    const learningline = cardElement.querySelector('learning-line');

    for (const prop in cardElement.state) {
      learningline.setState(prop, cardElement.state[prop]);
    }
    cardElement.insertAdjacentHTML(`afterbegin`, `
      <span slot='statusText'>Очень клево все</span>
    `)

    for (let i = 0; i < 5; i += 1) {
      cardElement.insertAdjacentHTML(`afterbegin`, `
      <div slot='statusDot' class='dot'></div>
      `)
    }
    updateStatusBar(cardElement)

    if (cardElement.settings.showWordTranscription) {
      cardElement.insertAdjacentHTML(
        'beforeend',
        `<span slot='RUitem'>${cardElement.state.wordTranslate}</span>`,
      );
    }

    if (cardElement.settings.showWordTranscription) {
      cardElement.insertAdjacentHTML(
        'beforeend',
        `<span slot='transcription'>${cardElement.state.transcription}</span>`,
      );
    }

    if (cardElement.settings.showAnswer && !cardElement.state.isDone) {
      cardElement.insertAdjacentHTML('beforeend', "<div slot='openWord'>Ответ</div>");
    }

    if (cardElement.settings.deleteWords && !cardElement.state.isDeleted) {
      cardElement.insertAdjacentHTML('beforeend', "<div slot='deleteWord'>Удалить</div>");
    }

    /*
    if (cardElement.settings.markAsDifficultWord && !cardElement.state.isDeleted) {
      cardElement.insertAdjacentHTML('beforeend', "<div slot='hardWord'>Сложно</div>");
    }*/
    cardElement.insertAdjacentHTML('beforeend', "<div slot='repeatWord'>Снова</div>");


    if (cardElement.settings.deleteWords && cardElement.state.isDeleted) {
      cardElement.insertAdjacentHTML('beforeend', "<div slot='restoreWord'>Восстановить</div>");
    }

    createImg(cardElement);
    createAudio(cardElement);
  }


  if (cardElement.settings.showExplanationExample) {
    const example = cardElement.state.textExample;
    const { word } = cardElement.state;
    const regexp = /<b>\w+<\/b>/;
    let exampleUpdated = null;
    if (cardElement.state.isDone) {
      if (cardElement.state.isDeleted) {
        exampleUpdated = example.replace(
          regexp,
          `<span style='color: #fe5c55' ><b>${word}</b></span>`,
        );
      } else {
        exampleUpdated = example.replace(
          regexp,
          `<span style='color: #61bd4f' ><b>${word}</b></span>`,
        );
      }
    } else {

      exampleUpdated = example.replace(regexp, '____');
    }
    cardElement.insertAdjacentHTML(
      'beforeend',
      `<span slot='ENExample'>${exampleUpdated}</span>
  <span slot='RUExample'>${cardElement.state.textExampleTranslate}</span>`,
    );
  }

  if (cardElement.settings.showSentenceExplanation) {
    const example = cardElement.state.textMeaning;
    const { word } = cardElement.state;
    const regexp = /<i>\w+<\/i>/;
    let exampleUpdated = null;
    if (cardElement.state.isDone) {
      if (cardElement.state.isDeleted) {
        exampleUpdated = example.replace(
          regexp,
          `<span style='color: #fe5c55'><b>${word}</b></span>`,
        );
      } else {
        exampleUpdated = example.replace(
          regexp,
          `<span style='color: #61bd4f'><b>${word}</b></span>`,
        );
      }
    } else {

      exampleUpdated = example.replace(regexp, '____');
    }
    cardElement.insertAdjacentHTML(
      'beforeend',
      `<span slot='ENMeaning'>${exampleUpdated}</span>
  <span slot='RUMeaning'>${cardElement.state.textMeaningTranslate}</span>`,
    );
  }
}
