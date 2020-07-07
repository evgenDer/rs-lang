import { removeChild } from '../../utils/helpers';
import { DATA_URL } from '../../utils/constants';
import { Statistics } from '../../statistics/components/statistics';

function createStatisticSentence(audioSrc, textExample){
  const newElement = `<div class="line">
    <button class = "btn_pronoucing"><audio src = ${DATA_URL}${audioSrc}></button>
    <p>${textExample}</p>
  </div>`;

  return newElement;
}

export function addStatisticRoundEnglishPuzzle(dataPageRound){
  const statistic = new Statistics('EnglishPuzzle');
  let correct = 0;
  let error = 0;
  const errorField = document.querySelector('.modal-round__error');
  removeChild(errorField);
  const correctField = document.querySelector('.modal-round__correct');
  removeChild(correctField);
  correctField.insertAdjacentHTML('beforeend', `<h3>Я знаю <span>0</span</h3></h3>`);
  errorField.insertAdjacentHTML('beforeend', `<h3>Я не знаю <span>0</span</h3></h3>`);
  dataPageRound.forEach((sentence) =>{
    const element = createStatisticSentence(sentence.audioExample, sentence.textExample);
    if(sentence.result){
      correct+=1;
      correctField.insertAdjacentHTML('beforeend', element);
      correctField.querySelector('span').innerText = `${correct}`;
    }
    else{
      error+=1;
      errorField.insertAdjacentHTML('beforeend', element);
      errorField.querySelector('span').innerText = `${error}`;
    }
  });
  statistic.updateGameStatistics(correct, error);
  document.querySelectorAll('.modal-round .btn_pronoucing').forEach((button) => {
    button.addEventListener('click', () => {
      const audio = button.querySelector('audio');
      const audioPlay = new Audio(audio.src);
      audioPlay.play();
  });
});
}

export function createStaticticRound(imageSrc, infoAboutImage){
  const resultBlock = document.querySelector('.block-results');
  const statisticElement =
  `<div id="modal-close-default" uk-modal class ="modal"  bg-close="false" esc-close="false">
      <div class="uk-modal-dialog modal-round"">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="uk-modal-header">
            <img src = ${imageSrc}>
            <p>${infoAboutImage}</p>
          </div>
          <div uk-overflow-auto class = 'uk-modal-body'>
          <div class="modal-round__correct">
            <h3>Я знаю <span>0</span></h3>
          </div>
          <div class="modal-round__error">
            <h3>Я не знаю <span>0</span</h3>
          </div>
          </div>
          <div class="uk-modal-footer">
            <button id="modal-btn-report">Создать отчет</button>
        </div>
      </div>
  </div>
`;

  resultBlock.insertAdjacentHTML('beforeend', statisticElement);
}


