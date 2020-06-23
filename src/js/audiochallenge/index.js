const startBtn = document.querySelector('.description__start');
const description = document.querySelector('.audiochallenge__desription');
const gameField = document.querySelector('.audiochallenge__game-field');
const exitGameBtn = document.querySelector('.audiochallenge__exit > .exit');
const backGameBtn = document.querySelector('.audiochallenge__exit > .exit__back');
const exitBtnContainer = document.querySelector('.audiochallenge__exit');

const mainSpeakerBtn = document.getElementById('main-speaker');
const wordSpeakerBtn = document.getElementById('word-speaker');
const exampleSpeakerBtn = document.getElementById('example-speaker');


function closeDescription() {
  description.classList.add('hidden');
}

function openDescription() {
  description.classList.remove('hidden');
}

function closeGameField() {
  gameField.classList.add('hidden');
}

function openGameField() {
  gameField.classList.remove('hidden');
}


function exitGame() {
  document.location.href = 'games.html';
}

function setExitButtonBackMode() {
  exitBtnContainer.classList.remove('audiochallenge__exit_full');
  exitBtnContainer.classList.add('audiochallenge__exit_back');
}

function setExitButtonStdMode() {
  exitBtnContainer.classList.remove('audiochallenge__exit_back');
  exitBtnContainer.classList.add('audiochallenge__exit_full');
}


function addExitGameBtnClickHandler() {
  exitGameBtn.addEventListener('click', () => {
    exitGame();
  });
  backGameBtn.addEventListener('click', () => {
    closeGameField();
    openDescription();
    setExitButtonStdMode();
  })
}


function addStartButtonClickHandler() {
  startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    closeDescription();
    openGameField();
    setExitButtonBackMode();
  });
}


function addSpeakerButtonsClickHandler() {
  mainSpeakerBtn.addEventListener('click', () => {
    // repeat audio
  });
  wordSpeakerBtn.addEventListener('click', () => {
    // repeat audio
  });
  exampleSpeakerBtn.addEventListener('click', () => {
    // repeat audio
  });
}


window.onload = () => {
  addStartButtonClickHandler();
  addExitGameBtnClickHandler();

  addSpeakerButtonsClickHandler();
};
