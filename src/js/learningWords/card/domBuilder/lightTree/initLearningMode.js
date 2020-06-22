/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
import LearningLineElement from '../../components/learningLineElement';

customElements.define('learning-line', LearningLineElement);

export default function initLearning(cardElement, isJustUpdated = false) {
  if (isJustUpdated) {
    cardElement.querySelector('learning-line').setState('isDone', cardElement.state.isDone);
    cardElement.querySelector('learning-line').setState('isDeleted', cardElement.state.isDeleted);
  } else {
    cardElement.innerHTML = "<learning-line slot='ENitem'></learning-line>";
    const learningline = cardElement.querySelector('learning-line');

    for (const prop in cardElement.state) {
      learningline.setState(prop, cardElement.state[prop]);
    }

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

    if (cardElement.settings.markAsDifficultWord && !cardElement.state.isDeleted) {
      cardElement.insertAdjacentHTML('beforeend', "<div slot='hardWord'>Сложно</div>");
    }

    if (cardElement.settings.deleteWords && cardElement.state.isDeleted) {
      cardElement.insertAdjacentHTML('beforeend', "<div slot='restoreWord'>Восстановить</div>");
    }

    cardElement.insertAdjacentHTML('beforeend', "<div slot='cardImg'></div>");
  }

  if (cardElement.settings.showExplanationExample) {
    const example = cardElement.state.textExample;
    const { word } = cardElement.state;
    let exampleUpdated = null;
    if (cardElement.state.isDone) {
      if (cardElement.state.isDeleted) {
        exampleUpdated = example.replace(
          `<b>${word}</b>`,
          `<span style='color: #fe5c55' ><b>${word}</b></span>`,
        );
      } else {
        exampleUpdated = example.replace(
          `<b>${word}</b>`,
          `<span style='color: #61bd4f' ><b>${word}</b></span>`,
        );
      }
    } else {
      exampleUpdated = example.replace(`<b>${word}</b>`, '____');
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
    let exampleUpdated = null;
    if (cardElement.state.isDone) {
      if (cardElement.state.isDeleted) {
        exampleUpdated = example.replace(
          `<i>${word}</i>`,
          `<span style='color: #fe5c55'><b>${word}</b></span>`,
        );
      } else {
        exampleUpdated = example.replace(
          `<i>${word}</i>`,
          `<span style='color: #61bd4f'><b>${word}</b></span>`,
        );
      }
    } else {
      exampleUpdated = example.replace(`<i>${word}</i>`, '____');
    }
    cardElement.insertAdjacentHTML(
      'beforeend',
      `<span slot='ENMeaning'>${exampleUpdated}</span>
  <span slot='RUMeaning'>${cardElement.state.textMeaningTranslate}</span>`,
    );
  }
}
