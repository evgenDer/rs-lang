import { removeChild } from '../helpers/html-helper';
import playAudio from '../helpers/audio';
import { updatDifficultyLevel } from '../configuration';
import { DATA_URL } from '../utils/constants';


function createStatisticSentence(audioSrc, textExample, translate){
  const newElement = `<div class="line">
    <button class = "btn_pronoucing"><audio src = ${DATA_URL}${audioSrc}></button>
    <p>${textExample} - ${translate}</p>
  </div>`;

  return newElement;
}

export function addStatisticRound(dataPageRound){
  let correct = 0;
  let error = 0;
  const errorField = document.querySelector('.modal-round__error');
  removeChild(errorField);
  const correctField = document.querySelector('.modal-round__correct');
  removeChild(correctField);
  correctField.insertAdjacentHTML('beforeend', `<h3>Правильно <span>0</span</h3></h3>`);
  errorField.insertAdjacentHTML('beforeend', `<h3>Неправильно <span>0</span</h3></h3>`);
  dataPageRound.forEach((sentence) =>{
    const element = createStatisticSentence(sentence.audio, sentence.word, sentence.wordTranslate);
    if(sentence.result){
      correct += 1;
      correctField.insertAdjacentHTML('beforeend', element);
      correctField.querySelector('span').innerText = `${correct}`;
    }
    if(!sentence.result){
      error+=1;
      errorField.insertAdjacentHTML('beforeend', element);
      errorField.querySelector('span').innerText = `${error}`;
    }
  });
  document.querySelectorAll('.modal-round .btn_pronoucing').forEach((button) => {
    button.addEventListener('click', () => {
      const audio = button.querySelector('audio');
      playAudio(audio.src);
  });
});
}

async function getComparedHTMLElement(totalCorrect){
  const countSentence = 30;
  const countLevels = 6;
  let innerTextResult = '';
  let lvl = Math.ceil(totalCorrect/countSentence * (countLevels)) - 1;
  if(totalCorrect === 0){
    lvl = 0;
  }
  innerTextResult = `Ваш уровень для слов равен ${lvl}`;
  const compareElement = `
    <div class = "modal__results">
      <h3>${innerTextResult}</h3>
    </div>
  `;
  await updatDifficultyLevel(lvl);
  localStorage.setItem('lvl', lvl);
  return compareElement;
}

export async function createStaticticRound(totalCorrect, totalErrors, errorArray){
  const compareHTMLElement = await getComparedHTMLElement(totalCorrect, totalErrors, errorArray);
  const statisticElement =
  `<div id="modal" uk-modal class = 'modal'>
      <div class="modal-round uk-align-center">
          <div class="uk-modal-header">
            <h2>Результаты</h2>
             ${compareHTMLElement}
          </div>
          <div uk-overflow-auto class="uk-modal-body">
            <div class="modal-round__correct">
              <h3>Правильно <span>0</span></h3>
            </div>
            <div class="modal-round__error">
              <h3>Неправильно <span>0</span</h3>
            </div>
          </div>
          <div class="uk-modal-footer">
            <button id="modal-btn-learn">Приступить к изучению</button>
          </div>
      </div>
  </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', statisticElement);
  // eslint-disable-next-line no-undef
  UIkit.modal('#modal', { bgclose: false, center: true}).show();
  document.getElementById('modal-btn-learn').addEventListener('click', () => {
    window.location.href = 'learningWords.html';
  });
}
