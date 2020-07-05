import moment from 'moment';
import { createElementObj } from '../utils/create';

export default class Card {
constructor(data) {
this.data =  data;
moment.lang('ru');
}

generate() {
  const wordContains = Card.createBlock('word', this.data.word, this.data.wordTranslate, this.data.transcription||'' );
  const vocabularyWordContains = createElementObj({ tagName: 'div', classNames: `vocabulary__card`,  children: [wordContains]});
  if (this.data.textExample){
    const contextContains = Card.createBlock('context', this.data.textExample, this.data.textExampleTranslate);
    vocabularyWordContains.append(contextContains);
  }
  if(this.data.textMeaning){
    const meaningContains = Card.createBlock('meaning', this.data.textMeaning, this.data.textMeaningTranslate);
    vocabularyWordContains.append(meaningContains);
  }
  const lastRepeat = createElementObj({ tagName: 'div', classNames: 'data-point', textContent: `Давность: ${moment(this.data.lastUpdateDate).fromNow()}`});
  const repeatCount = createElementObj({ tagName: 'div', classNames: 'data-point', textContent: `Повторений: ${this.data.repeatCount}`});
  const nextRepeat = createElementObj({ tagName: 'div', classNames: 'data-point', textContent: `Следующее повторение:`});
  const cardInfoContainer = createElementObj({
    tagName: 'div',
    classNames: 'vocabulary__card-info',
    children: [ lastRepeat, repeatCount, nextRepeat ],
  });
  vocabularyWordContains.append(cardInfoContainer);
  return vocabularyWordContains;
}

static createBlock(nameBlock, textParam, translateParam, transcriptionParam ) {
  const icon = createElementObj({
    tagName: 'img',
    classNames: `vocabulary__${nameBlock}_icon vocabulary__card-icon`,
    attrs: [['src', './assets/img/icons/sound.svg'], ['alt', 'sound icon']],
  });
  const text = createElementObj({ tagName: 'span', classNames: `vocabulary__${nameBlock}_text word-text_color`, textContent: textParam});
  const translate = createElementObj({
    tagName: 'p',
    classNames: `vocabulary__${nameBlock}_translate vocabulary_transcription`,
    textContent: translateParam,
  });
  const container = createElementObj({ tagName: 'div', classNames: `vocabulary__block-container`, children: [ icon, text, translate ]});
  if(transcriptionParam) {
    const transcription = createElementObj({ tagName: 'span', classNames: `vocabulary__word_transcription`, textContent: transcriptionParam});
    container.insertBefore(transcription, translate);
  }
  return container;
}
}
