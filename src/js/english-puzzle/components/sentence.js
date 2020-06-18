import { shuffle } from '../../utils/helpers';
import { createElement } from '../../utils/create';

export function fillText(puzzle) {
  const context = puzzle.getContext('2d');
  context.fillStyle = 'white';
  context.font = 'bold 2em sans-serif';
  context.textAlign = 'center';
  const text = puzzle.dataset.word;
  const width = puzzle.width - puzzle.height / 2;
  context.fillText(`${text}`, width / 2 + puzzle.height / 4, puzzle.height / 1.5, width);
}

export function drawPuzzleImage(puzzle, image) {
  const context = puzzle.getContext('2d');
  const widthClipElement = puzzle.dataset.clip;
  context.drawImage(image, widthClipElement, 0);
  fillText(puzzle);
  context.stroke();
}

// eslint-disable-next-line class-methods-use-this
export function fillPuzzleColor(puzzle) {
  const context = puzzle.getContext('2d');
  context.fillStyle = 'blue';
  context.fill();
  fillText(puzzle);
  context.stroke();
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
    const puzzle = document.createElement('canvas');
    const context = puzzle.getContext('2d');
    const radius = this.height / 4;
    puzzle.width = width + this.height / 2;
    puzzle.height = this.height;
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(0, 0);
    if (!isFirstSentence) {
      puzzle.style.marginLeft = `-${this.height / 2 - 2}px`;
      context.lineTo(0, radius);
      context.arc(radius / 2, 2 * radius, radius, (3 / 2) * Math.PI, (1 / 2) * Math.PI, false);
      context.lineTo(0, 3 * radius);
    }
    context.lineTo(0, this.height);
    context.lineTo(width, this.height);
    if (!isLastSentence) {
      context.lineTo(width, 3 * radius);
      // eslint-disable-next-line max-len
      context.arc(width + radius / 2, 2 * radius, radius, (1 / 2) * Math.PI, (3 / 2) * Math.PI, true);
      context.lineTo(width, radius);
    }
    context.lineTo(width, 0);
    context.lineTo(0, 0);
    context.closePath();
    context.clip();
    puzzle.setAttribute('data-clip', -this.width);
    puzzle.setAttribute('data-word', text);
    this.drawPuzzleImage(puzzle);
    return puzzle;
  }

  renderSourceGame() {
    this.renderNewSentence();
    const sentenceBlock = createElement('div', 'sentence', shuffle(this.sentenceBlock));
    return sentenceBlock;
  }

  renderCorrectSentence() {
    this.renderNewSentence();
    const sentenceBlock = createElement('div', 'sentence', this.sentenceBlock);
    return sentenceBlock;
  }

  renderNewSentence() {
    const arraySentence = this.sentence.split(' ');
    const minWidth = 3;
    let puzzle;
    const sentenceBlock = document.createElement('div');
    sentenceBlock.classList.add('sentence');
    arraySentence.forEach((element, index) => {
      const widthLastElement = this.imageWidth - this.width - this.height / 4;
      const widthElement = (index !== arraySentence.length - 1)
        ? (this.imageWidth / this.sentence.length) * element.length : widthLastElement;
      const widthForDrawElement = (element.length < minWidth && index !== arraySentence.length - 1)
        ? widthElement * 2.5 : widthElement;
      if (index === 0) puzzle = this.drawPuzzle(widthForDrawElement, element, false, true);
      else if (index === arraySentence.length - 1) {
        puzzle = this.drawPuzzle(widthForDrawElement, element, true, false);
      } else { puzzle = this.drawPuzzle(widthForDrawElement, element); }
      this.width += widthForDrawElement;
      this.sentenceBlock.push(puzzle);
    });
  }
}
