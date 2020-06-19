import { BUTTONS_CLASSES } from '../../utils/constants';
import { fillPuzzleColor, drawPuzzleImage } from './sentence';
import { DEFAULT_SETTINGS_PUZZLE } from '../../constants/defaul-settings';

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
  const sentenceElementsResult = RESULT_FIELD.querySelectorAll('.current > canvas');
  console.log(sentenceElementsSource);
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
  console.log(hintSoundIcon);
  debugger;
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

function generateHints() {
  const englishPuzzleSettings = JSON.parse(localStorage.getItem('englishPuzzle')) || DEFAULT_SETTINGS_PUZZLE;
  addHintAutoplaySound(englishPuzzleSettings.autoPlaySound);
  addHintPlaySound(englishPuzzleSettings.playSound);
  addHintShowImage(englishPuzzleSettings.showImage);
  addHintTranslate(englishPuzzleSettings.showTranslation);
}

function addEventsListenerOnHintButtons() {
  const englishPuzzleSettings = JSON.parse(localStorage.getItem('englishPuzzle')) || DEFAULT_SETTINGS_PUZZLE;
  document.querySelector(`.${BUTTONS_CLASSES.autoPlaySound}`).addEventListener('click', () => {
    englishPuzzleSettings.autoPlaySound = !englishPuzzleSettings.autoPlaySound;
    addHintAutoplaySound(englishPuzzleSettings.autoPlaySound);
  });
  document.querySelector(`.${BUTTONS_CLASSES.playSound}`).addEventListener('click', () => {
    englishPuzzleSettings.playSound = !englishPuzzleSettings.playSound;
    addHintPlaySound(englishPuzzleSettings.playSound);
  });
  document.querySelector(`.${BUTTONS_CLASSES.showTranslate}`).addEventListener('click', () => {
    englishPuzzleSettings.showTranslate = !englishPuzzleSettings.showTranslate;
    addHintTranslate(englishPuzzleSettings.showTranslate);
  });
  localStorage.setItem('englishPuzzle', JSON.stringify(englishPuzzleSettings));
}

export {
  addHintAutoplaySound, addHintShowImage, addEventsListenerOnHintButtons,
  addHintTranslate, addHintPlaySound, generateHints,
};
