import { removeChild } from '../helpers/html-helper';
import { DATA_URL, AUDIO_B64 } from '../utils/constants';
import { playAudio } from '../helpers/audio';
import { GAME_MODES, errorFields, successFields } from '../games/constants';
import { getGameMode } from '../games/gameModeSwitch';
import { Statistics } from '../statistics/components/statistics';
import * as downloadHelper from '../download/download';


const stat = new Statistics('Sprint');

function createStatisticSentence(audioSrc, textExample, translate){
  const mode = getGameMode();
  const audioHelper = mode === GAME_MODES.all ? DATA_URL : AUDIO_B64;
  const newElement = `<div class="line">
    <button class = "btn_pronoucing"><audio src = ${audioHelper}${audioSrc}></button>
    <p>${textExample} - ${translate}</p>
  </div>`;

  return newElement;
}

export function addStatisticRoundSprint(dataPageRound, points){
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
      successFields.push(`${sentence.word} - ${sentence.wordTranslate}`);
    }
    if(sentence.isError){
      error+=1;
      errorField.insertAdjacentHTML('beforeend', element);
      errorField.querySelector('span').innerText = `${error}`;
      errorFields.push(`${sentence.word} - ${sentence.wordTranslate}`);
    }
  });
  stat.updateGameStatistics(correct, error, points);
  document.querySelectorAll('.modal-round .btn_pronoucing').forEach((button) => {
    button.addEventListener('click', () => {
      const audio = button.querySelector('audio');
      playAudio(audio.src);
  });
});
}

async function getCompareHTMLElement(points){
  const maxScore = await stat.getUserMaxScore();
  let innerTextResult = '';
  let innerTextComare = '';
  let resPer = 0;
  if(maxScore < points){
    innerTextResult = 'Это ваш лучший результат!';
    resPer = 1- (maxScore / points);
    innerTextComare = `Он на<span>${Math.round(resPer * 100)}%</span>лучше максимального`;
  } else if(maxScore > points){
    innerTextResult = 'Неплохой результат';
    resPer = (points === 0) ? 1 : 1 - points / maxScore;
    innerTextComare = `Он на<span>${Math.round(resPer * 100)}%</span>отстаёт от максимального`;
  } else {
    innerTextResult = 'Игра прошла успешно!';
    innerTextComare = `Вы достигли своего максимального результата`;
  }
  const compareElement = `
    <div class = "modal__results">
      <h3>${innerTextResult}</h3>
      <h4>${innerTextComare}</h4>
    </div>
  `;
  return compareElement;
}

export async function createStaticticRound(points){
  const compareHTMLElement = await getCompareHTMLElement(points);
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

document.getElementById('modal-btn-report').addEventListener('click', () => {
  errorFields.push('\r\n\r\n');

  const text = `Итог по игре "Аудиовызов"\r\n\r\n${errorFields.join('\r\n')}${successFields.join('\r\n')}`;
  downloadHelper.download(`savannah-report_${new Date().toISOString()}.txt`, text);
});

}
