import { removeChild } from '../helpers/html-helper';
import { DATA_URL } from '../utils/constants';
import playAudio from '../helpers/audio';

function createStatisticSentence(audioSrc, textExample, translate){
  const newElement = `<div class="line">
    <button class = "btn_pronoucing"><audio src = ${DATA_URL}${audioSrc}></button>
    <p>${textExample} - ${translate}</p>
  </div>`;

  return newElement;
}

export function addStatisticRoundSprint(dataPageRound){
  let correct = 0;
  let error = 0;
  const errorField = document.querySelector('.modal-round__error');
  removeChild(errorField);
  const correctField = document.querySelector('.modal-round__correct');
  removeChild(correctField);
  correctField.insertAdjacentHTML('beforeend', `<h3>Я знаю <span>0</span</h3></h3>`);
  errorField.insertAdjacentHTML('beforeend', `<h3>Я не знаю <span>0</span</h3></h3>`);
  dataPageRound.forEach((sentence) =>{
    const element = createStatisticSentence(sentence.audio, sentence.word, sentence.wordTranslate);
    if(sentence.isCorrect){
      correct += 1;
      correctField.insertAdjacentHTML('beforeend', element);
      correctField.querySelector('span').innerText = `${correct}`;
    }
    if(sentence.isError){
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

export function createStaticticRound(points, compareHTMLElement = ''){
  const statisticElement =
  `<div id="modal-close-default" uk-modal class = 'modal'>
      <div class="uk-modal-dialog modal-round" bg-close = "false" esc-close = "false">
          <div class="uk-modal-header">
            <h2>Результаты</h2>
            <h3>Вы набрали</h3>
            <h3><span class = "points">${points}</span>баллов</h3>
            ${compareHTMLElement}
          </div>
          <div uk-overflow-auto class="uk-modal-body">
            <div class="modal-round__correct">
              <h3>Я знаю <span>0</span></h3>
            </div>
            <div class="modal-round__error">
              <h3>Я не знаю <span>0</span</h3>
            </div>
          </div>
          <div class="uk-modal-footer">
            <button id="modal-btn-close">Закрыть</button>
            <button id="modal-btn-report">Создать отчет</button>
          </div>
      </div>
  </div>
  `;
  document.body.insertAdjacentHTML('beforeend', statisticElement);
}


