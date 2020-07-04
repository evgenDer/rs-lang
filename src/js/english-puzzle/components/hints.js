import { BUTTONS_CLASSES } from '../../utils/constants';
import { fillPuzzleColor, drawPuzzleImage } from './sentence';
import { DEFAULT_SETTINGS_PUZZLE } from '../../constants/defaul-settings';
import { setDataEnglishPuzzle, getDataEnglishPuzzle } from '../../utils/storage';

const RESULT_FIELD = document.querySelector('.block-results');
const SOURCE_FIELD = document.querySelector('.block-source');

function addHintTranslate(isHintOn) {
  const hintElement = document.querySelector(`.${BUTTONS_CLASSES.showTranslate}`);
  const translate = document.querySelector('.translate');
  if (!isHintOn) {
    hintElement.classList.add('disable');
    translate.classList.add('hidden');
  } else {
    translate.classList.remove('hidden');
    hintElement.classList.remove('disable');
  }
}

function addHintShowImage(isHintOn, image) {
  const hintElement = document.querySelector(`.${BUTTONS_CLASSES.showImage}`);
  const sentenceElementsSource = SOURCE_FIELD.querySelectorAll('canvas');
  const sentenceElementsResult = RESULT_FIELD.querySelectorAll('.current canvas');
  if (!isHintOn) {
    hintElement.classList.add('disable');
    sentenceElementsSource.forEach((canvas) => { fillPuzzleColor(canvas); });
    sentenceElementsResult.forEach((canvas) => { fillPuzzleColor(canvas); });
  } else {
    sentenceElementsSource.forEach((canvas) => { drawPuzzleImage(canvas, image); });
    sentenceElementsResult.forEach((canvas) => { drawPuzzleImage(canvas, image); });
    hintElement.classList.remove('disable');
  }
}

function addHintPlaySound(isHintOn) {
  const hintElement = document.querySelector(`.${BUTTONS_CLASSES.playSound}`);
  const hintSoundIcon = document.querySelector('.block-hints .btn_pronoucing');
  if (!isHintOn) {
    hintElement.classList.add('disable');
    hintSoundIcon.classList.add('hidden');
  } else {
    hintSoundIcon.classList.remove('hidden');
    hintElement.classList.remove('disable');
  }
}

function addHintAutoplaySound(isHintOn) {
  const hintElement = document.querySelector(`.${BUTTONS_CLASSES.autoPlaySound}`);
  if (!isHintOn) {
    hintElement.classList.add('disable');
  } else {
    hintElement.classList.remove('disable');
  }
}

function addHints() {
  const englishPuzzleSettings = JSON.parse(localStorage.getItem('englishPuzzle')) || DEFAULT_SETTINGS_PUZZLE;
  addHintAutoplaySound(englishPuzzleSettings.autoPlaySound);
  addHintPlaySound(englishPuzzleSettings.playSound);
  addHintTranslate(englishPuzzleSettings.showTranslation);
}

function addEventsListenerOnHintButtons() {
  document.querySelector(`.${BUTTONS_CLASSES.autoPlaySound}`).addEventListener('click', () => {
    const englishPuzzleSettings = getDataEnglishPuzzle();
    englishPuzzleSettings.autoPlaySound = !englishPuzzleSettings.autoPlaySound;
    addHintAutoplaySound(englishPuzzleSettings.autoPlaySound);
    setDataEnglishPuzzle(englishPuzzleSettings);
  });
  document.querySelector(`.${BUTTONS_CLASSES.playSound}`).addEventListener('click', () => {
    const englishPuzzleSettings = getDataEnglishPuzzle();
    englishPuzzleSettings.playSound = !englishPuzzleSettings.playSound;
    addHintPlaySound(englishPuzzleSettings.playSound);
    setDataEnglishPuzzle(englishPuzzleSettings);
  });
  document.querySelector(`.${BUTTONS_CLASSES.showTranslate}`).addEventListener('click', () => {
    const englishPuzzleSettings = getDataEnglishPuzzle();
    englishPuzzleSettings.showTranslate = !englishPuzzleSettings.showTranslate;
    addHintTranslate(englishPuzzleSettings.showTranslate);
    setDataEnglishPuzzle(englishPuzzleSettings);
  });
}

export {
  addHintAutoplaySound, addHintShowImage, addEventsListenerOnHintButtons,
  addHintTranslate, addHintPlaySound, addHints,
};
