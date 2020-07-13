import moment from 'moment';
import {markToText, markToStyle} from '../constants/progressBarTooltipTypes';
import { createElementObj } from '../utils/create';
import { WORD_STATE, WORD_DIFFICULTLY } from '../utils/constants';
import { updateUserWord } from '../api/userWords';

const ASSETS_URL = 'https://raw.githubusercontent.com/Marrlika/rslang-data/master/';

export default class Card {
  constructor(data,) {
    this.data = data;
    moment.locale('ru');
  }

  generate(callbackFunction, displayRestoreButton) {
    const wordContains = Card.createBlock('word', this.data.word, this.data.wordTranslate, this.data.transcription || '');
    this.vocabularyWordContains = createElementObj({ tagName: 'div', classNames: `vocabulary__word-container`, children: [this.generateProgressBar(), wordContains] });

    if (this.data.textExample) {
      const contextContains = Card.createBlock('context', this.data.textExample, this.data.textExampleTranslate);
      this.vocabularyWordContains.append(contextContains);
    }

    if (this.data.textMeaning) {
      const meaningContains = Card.createBlock('meaning', this.data.textMeaning, this.data.textMeaningTranslate);
      this.vocabularyWordContains.append(meaningContains);
    }

    const cardInfoContainer = this.generateCardInfo();
    this.vocabularyCardContains = createElementObj({ tagName: 'div', classNames: `vocabulary__card uk-animation-fade`, children: [this.vocabularyWordContains, cardInfoContainer] });

    if (this.data.image) {
      const cardImg = createElementObj({
        tagName: 'img',
        classNames: `vocabulary__card-img`,
        attrs: [['src', `${ASSETS_URL}${this.data.image}`], ['alt', `${this.data.word} image`]],
      });
      this.vocabularyCardContains.insertBefore(cardImg, cardInfoContainer);
    }

    if (displayRestoreButton) {
      const btnIcon = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: refresh']] });
      this.btnRestore = createElementObj({ tagName: 'button',
        classNames: 'btn-restore',
        children: [btnIcon],
        attrs: [['uk-tooltip', 'Восстановить']],
      });
      this.vocabularyCardContains.insertBefore(this.btnRestore, cardInfoContainer);
    }
    this.addListeners(callbackFunction, { difficulty: this.data.difficulty, optional: this.data.optional });
    return this.vocabularyCardContains;
  }

  static createBlock(nameBlock, textParam, translateParam, transcriptionParam) {
    const icon = createElementObj({
      tagName: 'img',
      classNames: `vocabulary__${nameBlock}_icon vocabulary__card-icon`,
      attrs: [['src', './assets/img/icons/sound.svg'], ['alt', 'sound icon'], ['id', nameBlock]],
    });
    const text = createElementObj({ tagName: 'span', classNames: `vocabulary__${nameBlock}_text word-text_color`, textContent: textParam });
    const translate = createElementObj({
      tagName: 'p',
      classNames: `vocabulary__${nameBlock}_translate vocabulary_translate`,
      textContent: translateParam,
    });
    const container = createElementObj({ tagName: 'div', classNames: `vocabulary__block-container ${nameBlock}_block-container`, children: [icon, text, translate] });
    if (transcriptionParam) {
      const transcription = createElementObj({ tagName: 'span', classNames: `vocabulary__word_transcription`, textContent: transcriptionParam });
      container.insertBefore(transcription, translate);
    }
    return container;
  }

  generateProgressBar() {
    const progressBarTooltipTypes = Object.values(markToText);
    const progressBarItems = [];
    const progressBarLevel = Math.floor(this.data.optional.successPoint);
    for (let i = 1; i < progressBarTooltipTypes.length; i += 1) {
      const progressBarItem = createElementObj({ tagName: 'div', classNames: `vocabulary__progress-bar_item` });
      if (i <= progressBarLevel) {
        progressBarItem.style.backgroundColor = markToStyle[progressBarLevel];
        progressBarItem.style.opacity = 0.9;
      }
      progressBarItems.push(progressBarItem);
    }
    const progressBar = createElementObj({
      tagName: 'div',
      classNames: 'vocabulary__progress-bar',
      children: progressBarItems,
      attrs: [['uk-tooltip', `title:${progressBarTooltipTypes[progressBarLevel]}; pos: top-left; offset: -0.1`]]
    });
    return progressBar;
  }

  generateCardInfo() {
    const lastRepeat = createElementObj({ tagName: 'div', classNames: 'data-point', textContent: `Давность: ${moment(this.data.optional.lastUpdateDate).fromNow()}` });
    const repeatCount = createElementObj({ tagName: 'div', classNames: 'data-point', textContent: `Повторений: ${this.data.optional.repeatCount}` });
    const nextRepeat = createElementObj({
      tagName: 'div',
      classNames: 'data-point',
      textContent: `Следующее повторение: ${(this.data.repeatTiming) ? moment(this.data.repeatTiming).fromNow() : '---'}`
    });
    const cardInfoContainer = createElementObj({
      tagName: 'div',
      classNames: 'vocabulary__card-info',
      children: [lastRepeat, repeatCount, nextRepeat],
    });
    return cardInfoContainer;
  }

  getIdWord() {
    return this.data.id;
  }

  getElement() {
    return this.vocabularyCardContains;
  }

  getlastUpdateDate() {
    return this.data.optional.lastUpdateDate;
  }

  getWord() {
    return this.data.word;
  }

  getProgress() {
    return this.data.optional.successPoint;
  }

  getRepeatCount() {
    return this.data.optional.repeatCount;
  }


  addListeners(callbackFunction) {
    this.vocabularyWordContains.addEventListener('click', (event) => {
      switch (event.target.id) {
        case 'word':
          callbackFunction.OnClickPlayAudio(`${ASSETS_URL}${this.data.audio}`);
          break;
        case 'context':
          callbackFunction.OnClickPlayAudio(`${ASSETS_URL}${this.data.audioExample}`);
          break;
        case 'meaning':
          callbackFunction.OnClickPlayAudio(`${ASSETS_URL}${this.data.audioMeaning}`);
          break;
        default:
      }
    });

    if (this.btnRestore) {
      this.btnRestore.addEventListener('click', () => {

        if (this.data.difficulty === WORD_DIFFICULTLY.hard) {
          this.data.difficulty = WORD_DIFFICULTLY.normal;
        }
        if (this.data.optional.mode === WORD_STATE.deleted) {
          this.data.optional.mode = WORD_STATE.repeating;
        }
        this.data.optional.lastUpdateDate = Date.now();
        updateUserWord(this.data.id, { difficulty: this.data.difficulty, optional: this.data.optional })
        callbackFunction.OnClickRestore(this.data.id);
      });
    }
  }
}
