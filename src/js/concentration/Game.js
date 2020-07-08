/* eslint-disable no-param-reassign */

import { createElement } from '../utils/create';
import { GAME_MODES, ERR_MSG } from '../games/constants';
import { getFullDataWords, getWordById } from '../api/words';
import { showElement, hideElement } from '../helpers/html-helper';
import { shuffleArray } from '../helpers/math-hepler';
import { selectNextRound, getCurrentRound, getCurrentLevel } from '../games/dropdown';
import { Statistics } from '../statistics/components/statistics';
import { addStatisticsRound, createStaticticsRound } from './statistics';
import { increaseWordReferenceCount } from '../words/updateWordState';
import { getAllUserWords, updateUserWord } from '../api/userWords';
import { WORD_STATE } from '../utils/constants';
import { saveCustomConfiguration } from '../configuration/index';


const loader = document.querySelector('.concentration__load-page');
const startLoading = () => showElement(loader);
const stopLoading = () => hideElement(loader);

const backGameBtn = document.querySelector('.concentration__exit > .exit__back');


// eslint-disable-next-line import/prefer-default-export
export class Game {
  constructor(mode = GAME_MODES.all, level = 0, round = 0) {
    this.name = 'Концентрация';

    this.mode = mode;
    this.level = level;
    this.round = round;

    this.gameField = document.querySelector('.concentration__game-field');
    this.cardsContainer = document.querySelector('.game-field__cards');
    this.cards = [];
    
    this.firstCard = undefined;
    this.secondCard = undefined;
    this.hasBeenCardFlipped = false;
    this.isClickable = false;
    
    this.wordsAmntInRound = 10;
    this.guessed = 0;
    this.errors = 0;
    this.data = [];
    this.userData = [];
    this.words = [];
    this.score = 0;

    this.statistics = new Statistics(this.name);
  }

  startGame() {
    hideElement(backGameBtn);
    startLoading();

    this.getRoundData().then(() => {
      stopLoading();
      showElement(backGameBtn);

      showElement(this.gameField);

      this.generateCards();
      this.addCardsClickHandler();

      this.startTask();
    }).catch((err) => {
      // eslint-disable-next-line no-undef
      UIkit.notification({
        message: `<span uk-icon='icon: warning'></span> ${err}`,
        status: 'warning',
        pos: 'top-center',
      });

      stopLoading();
      backGameBtn.click();
    });
  }

  startTask() {
    this.getCardsData();
    this.fillCards();

    setTimeout(() => this.openAllCards(), 1000);
    setTimeout(() => {
      this.closeAllCards();
      setTimeout(() => {
        this.isClickable = true;
      }, 2000);
    }, 7000);
  }

  getCardsData() {
    const wordsEng = this.data.map(({ id, word }) => ({ id, word }));
    const wordsRus = this.data.map(({ id, wordTranslate }) => ({ id, word: wordTranslate }));

    this.words = [...wordsEng, ...wordsRus];
    shuffleArray(this.words);
  }

  fillCards() {
    this.words.forEach(({ id, word }, index) => {
      this.cards[index].dataset.wordid = id;
      this.cards[index].lastChild.lastChild.lastChild.textContent = word;
    });
  }

  async getRoundData() {
    if (this.mode === GAME_MODES.all) {
      this.data = await getFullDataWords(this.level, this.round, this.wordsAmntInRound);
      shuffleArray(this.data);
    } else {
      const userData = await getAllUserWords();
      this.userData = userData
        .filter((word) => word.optional.mode !== WORD_STATE.deleted)
        .sort((a, b) => a.optional.successPoint - b.optional.successPoint)
        .slice(0, this.wordsAmntInRound);
      if (this.userData.length < this.wordsAmntInRound) {
        throw ERR_MSG;
      }
      shuffleArray(this.userData);

      const promises = [];
      this.userData.forEach(({ wordId }) => promises.push(getWordById(wordId)));

      this.data = await Promise.all(promises);
    }
  }

  generateCards() {
    this.clearGameField();
    for (let i = 0; i < this.wordsAmntInRound * 2; i += 1) {
      const face = createElement('img', '', [], [['src', './assets/img/card-face.png'], ['alt', 'card']]);
      const front = createElement('div', 'concentration-card__front', [face])
      const word = createElement('p', 'concentration-card__word');
      const inner = createElement('div', 'concentration-card__inner', [word]);
      const back = createElement('div', 'concentration-card__back', [inner]);
      const card = createElement('div', 'concentration-card', [front, back], [['data-wordid', '']]);

      this.cards.push(card);
      this.cardsContainer.appendChild(card);
    }
  }

  addCardsClickHandler() {
    this.cards.forEach((card) => {
      card.onclick = () => {
        if (this.isClickable && !card.classList.contains('concentration-card_disabled')) {
          card.classList.add('concentration-card_flipped');

          if (!this.hasBeenCardFlipped) {
            this.hasBeenCardFlipped = true;
            this.firstCard = card;
          } else {
            this.isClickable = false;
            this.hasBeenCardFlipped = false;
            this.secondCard = card === this.firstCard ? undefined : card;

            if (this.firstCard && this.secondCard) {
              if (this.firstCard.dataset.wordid === this.secondCard.dataset.wordid) {
                setTimeout(() => {
                  this.firstCard.classList.add('concentration-card_disabled');
                  this.secondCard.classList.add('concentration-card_disabled');
                  this.firstCard = undefined;
                  this.secondCard = undefined;
                  this.isClickable = true;

                  const currenWordId = card.dataset.wordid;

                  const currentAnswer = this.data.find(({ id }) => id === currenWordId);
                  currentAnswer.isCorrect = true;
                  currentAnswer.isError = false;

                  if (this.mode === GAME_MODES.learned) {
                    const currentUserData = this.userData.find(({ wordId }) => wordId === currenWordId);
                    if (currentUserData !== undefined) {
                      increaseWordReferenceCount(currentUserData);
                      updateUserWord(currentUserData.wordId, currentUserData);
                    }
                  }
                  
                  this.score += 10;
                  this.guessed += 1;
                  if (this.guessed === this.wordsAmntInRound) {
                    this.gameOver();
                  }
                }, 600);
              } else {
                setTimeout(() => {
                  this.firstCard.classList.remove('concentration-card_flipped');
                  this.secondCard.classList.remove('concentration-card_flipped');
                  this.firstCard = undefined;
                  this.secondCard = undefined;
                  this.isClickable = true;

                  this.errors += 1;
                  this.score -= 5;
                }, 800);
              }
            }
          }
        }
      }
    });
  }

  clearGameField() {
    this.cardsContainer.innerHTML = '';
  }

  stopGame() {
    this.clearGameField();
    hideElement(this.gameField);
  }

  showStatistics() {
    createStaticticsRound(this.score).then(() => {
      addStatisticsRound(this.data, this.mode === GAME_MODES.learned);
      // eslint-disable-next-line no-undef
      UIkit.modal('.modal-round').show();
    });
  }

  openAllCards() {
    this.cards.forEach((card, index) => {
      setTimeout(() => card.classList.add('concentration-card_flipped'), (index + 1) * 100);      
    });
  }

  closeAllCards() {
    this.cards.forEach((card, index) => {
      setTimeout(() => card.classList.remove('concentration-card_flipped'), (index + 1) * 100);      
    });
  }

  gameOver() {
    selectNextRound();
    saveCustomConfiguration('mygame', { level: getCurrentLevel(), round: getCurrentRound() });
    
    this.statistics.updateGameStatistics(this.guessed, 0, this.score);
    backGameBtn.click();
    this.showStatistics();
  }
}
