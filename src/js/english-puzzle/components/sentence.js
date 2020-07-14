import { shuffle } from '../../utils/helpers';
import { createElement } from '../../utils/create';
import { getDataEnglishPuzzle } from '../../utils/storage';

export function fillText(puzzle) {
  const context = puzzle.getContext('2d');
  context.fillStyle = 'white';
  const tabletWidth = 768;
  let fontSize = puzzle.height/3.5;
  context.textAlign = 'center';
  const width = puzzle.width - puzzle.height / 2;
  const text = puzzle.dataset.word;
  if(document.documentElement.clientWidth < tabletWidth){
    fontSize = puzzle.height / 5;
    context.textAlign = 'right';
    context.font = `bold ${fontSize}px sans-serif`;
    context.fillText(`${text}`, width / 2 + text.length * fontSize/4, puzzle.height / 1.5, width);
   // width = puzzle.width/2 - text.length;

  }
  else {
    context.font = `bold ${fontSize}px sans-serif`;
    context.fillText(`${text}`, width / 2 + puzzle.height / 4, puzzle.height / 1.5, width);
  }
}


export function strokePuzzle(puzzle){
  const context = puzzle.getContext('2d');
  context.lineWidth = 1;
  context.strokeStyle = 'white';
  context.stroke();
}

export function drawPuzzleImage(puzzle, imageSrc) {
  const context = puzzle.getContext('2d');
  const widthClipElement = puzzle.dataset.clip;
  const image = document.createElement('img');
  image.onload = () => {
    context.drawImage(image, widthClipElement, 0);
    fillText(puzzle);
    strokePuzzle(puzzle);
  };
  image.src = imageSrc;
}
// eslint-disable-next-line class-methods-use-this
export function fillPuzzleColor(puzzle) {
  const context = puzzle.getContext('2d');
  context.fillStyle = '#0f2c5c';
  context.fill();
  fillText(puzzle);
  strokePuzzle(puzzle);
}

export default class Sentence {
  constructor(image, sentence, width, height) {
    this.image = image;
    this.sentence = sentence;
    this.width = 0;
    this.imageWidth = width;
    this.height = height;
    this.sentenceBlock = [];
  }

  drawPuzzle(width, text, isLastSentence = false, isFirstSentence = false) {
    const tabletWidth = 768;
    const englishPuzzleSetting = getDataEnglishPuzzle();
    const puzzle = document.createElement('canvas');
    puzzle.style.marginLeft = `${- this.height /2 }px`;
    const context = puzzle.getContext('2d');
    const radius = this.height / 4;
    puzzle.width = width + this.height / 2;
    puzzle.height = this.height;
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(0, 0);
    if (!isFirstSentence && document.documentElement.clientWidth>tabletWidth) {
      context.lineTo(0, radius);
      context.arc(radius / 2, 2 * radius, radius, (3 / 2) * Math.PI, (1 / 2) * Math.PI, false);
      context.lineTo(0, 3 * radius);
    }
    context.lineTo(0, this.height);
    context.lineTo(width, this.height);
    if (!isLastSentence && document.documentElement.clientWidth>tabletWidth) {
      context.lineTo(width, 3 * radius);
      // eslint-disable-next-line max-len
      context.arc(width + radius / 2, 2 * radius, radius, (1 / 2) * Math.PI, (3 / 2) * Math.PI, true);
      context.lineTo(width, radius);
    }
    context.lineTo(width, 0);
    context.lineTo(0, 0);
    context.closePath();
    context.clip();
    puzzle.setAttribute('data-clip', -this.width + 2);
    puzzle.setAttribute('data-word', text);
    if (englishPuzzleSetting.showImage) {
      drawPuzzleImage(puzzle, this.image.src);
    } else fillPuzzleColor(puzzle);
    return puzzle;
  }

  renderSourceGame() {
    this.renderNewSentence();
    const sentenceBlock = createElement('div', 'sentence', shuffle(this.sentenceBlock));
    sentenceBlock.style.paddingLeft = `${this.height / 2 - 2}px`;
    return sentenceBlock;
  }

  renderCorrectSentence() {
    this.sentenceBlock = [];
    this.width = 0;
    this.renderNewSentence();
    const sentenceBlock = createElement('div', 'sentence current', this.sentenceBlock);
    sentenceBlock.style.paddingLeft = `${ this.height / 2 - 2}px`;
    return sentenceBlock;
  }

  renderNewSentence() {
    const arraySentence = this.sentence.split(' ');
    const minWidth = 4;
    let puzzle;
    arraySentence.forEach((element, index) => {
      const widthLastElement = this.imageWidth - this.width + 3;
      const widthElement = (index !== arraySentence.length - 1)
        ? (this.imageWidth / this.sentence.length) * element.length : widthLastElement;
      let  widthForDrawElement = 0;
      if (element.length < minWidth && index !== arraySentence.length - 1){
        widthForDrawElement = (element.length < 3 ) ? (widthElement * 1.8) : (widthElement * 1.3 + 2);
      } else {
        widthForDrawElement = widthElement;
      }
      if (index === 0) puzzle = this.drawPuzzle(Math.ceil(widthForDrawElement), element, false, true);
      else if (index === arraySentence.length - 1) {
        puzzle = this.drawPuzzle(Math.ceil(widthForDrawElement), element, true, false);
      } else { puzzle = this.drawPuzzle(Math.ceil(widthForDrawElement), element); }
      this.width += widthForDrawElement;
      this.sentenceBlock.push(puzzle);
    });
  }
}
