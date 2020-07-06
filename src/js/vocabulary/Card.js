import moment from 'moment';
import { createElementObj } from '../utils/create';

const ASSETS_URL = 'https://raw.githubusercontent.com/Marrlika/rslang-data/master/';

export default class Card {
constructor(data, ) {
this.data =  data;
moment.locale('ru');
}

generate(playAudio, displayRestoreButton) {
  const wordContains = Card.createBlock('word', this.data.word, this.data.wordTranslate, this.data.transcription||'' );
  this.vocabularyWordContains = createElementObj({ tagName: 'div', classNames: `vocabulary__word-container`, children: [wordContains]});
  if (this.data.textExample){
    const contextContains = Card.createBlock('context', this.data.textExample, this.data.textExampleTranslate);
    this.vocabularyWordContains.append(contextContains);
  }
  if(this.data.textMeaning){
    const meaningContains = Card.createBlock('meaning', this.data.textMeaning, this.data.textMeaningTranslate);
    this.vocabularyWordContains.append(meaningContains);
  }
  const lastRepeat = createElementObj({ tagName: 'div', classNames: 'data-point', textContent: `Давность: ${moment(this.data.lastUpdateDate).fromNow()}`});
  const repeatCount = createElementObj({ tagName: 'div', classNames: 'data-point', textContent: `Повторений: ${this.data.repeatCount}`});
  const nextRepeat = createElementObj({
    tagName: 'div',
    classNames: 'data-point',
    textContent: `Следующее повторение: ${(this.data.repeatTiming)? moment(this.data.repeatTiming).fromNow(): '---'}`});
  const cardInfoContainer = createElementObj({
    tagName: 'div',
    classNames: 'vocabulary__card-info',
    children: [ lastRepeat, repeatCount, nextRepeat ],
  });

  const vocabularyCardContains = createElementObj({ tagName: 'div', classNames: `vocabulary__card`,  children: [this.vocabularyWordContains, cardInfoContainer]});
  if(this.data.image) {
    const cardImg = createElementObj({
      tagName: 'img',
      classNames: `vocabulary__card-img`,
      attrs: [['src', `${ASSETS_URL}${this.data.image}`], ['alt', `${this.data.word} image`]],
    });
    vocabularyCardContains.insertBefore(cardImg, cardInfoContainer );
  }

  if (displayRestoreButton) {
    const btnIcon = createElementObj({ tagName: 'span', attrs: [['uk-icon', 'icon: refresh']]});
    this.btnRestore = createElementObj({ tagName: 'button', classNames: 'btn-restore', children: [btnIcon]});
    vocabularyCardContains.insertBefore(this.btnRestore, cardInfoContainer );
  }
  this.addListeners(playAudio);
  return vocabularyCardContains;
}

static createBlock(nameBlock, textParam, translateParam, transcriptionParam ) {
  const icon = createElementObj({
    tagName: 'img',
    classNames: `vocabulary__${nameBlock}_icon vocabulary__card-icon`,
    attrs: [['src', './assets/img/icons/sound.svg'], ['alt', 'sound icon'], ['id', nameBlock]],
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


addListeners(playAudio) {
  this.vocabularyWordContains.addEventListener('click', (event) => {
    switch (event.target.id) {
      case 'word':
        playAudio(`${ASSETS_URL}${this.data.audio}`);
        break;
      case 'context':
        playAudio(`${ASSETS_URL}${this.data.audioExample}`);
        break;
      case 'meaning':
        playAudio(`${ASSETS_URL}${this.data.audioMeaning}`);
        break;
      default:
    }
});
}
}
