import {
  removeChild
} from '../helpers/html-helper';
import {
  GAME_DATA_URL, errorFields, successFields,
} from '../games/constants';
import {
  AUDIO_B64
} from '../utils/constants';
import { playAudio } from '../helpers/audio';
import * as downloadHelper from '../download/download';




function createStatisticSentence(audioSrc, textExample, translate, b64 = false) {
  const helper = b64 ? AUDIO_B64 : GAME_DATA_URL;
  const newElement = `<div class="line">
    <button class = "btn_pronoucing"><audio src = ${helper}${audioSrc}></button>
    <p>${textExample} - ${translate}</p>
  </div>`;

  return newElement;
}

export function addStatisticsRound(dataPageRound, b64 = false) {
  let correct = 0;
  let error = 0;

  const errorField = document.querySelector('.modal-round__error');
  removeChild(errorField);

  const correctField = document.querySelector('.modal-round__correct');
  removeChild(correctField);

  correctField.insertAdjacentHTML('beforeend', `<h3>Я знаю <span>0</span</h3></h3>`);
  errorField.insertAdjacentHTML('beforeend', `<h3>Я не знаю <span>0</span</h3></h3>`);

  dataPageRound.forEach((sentence) => {
    const element = createStatisticSentence(sentence.audio, sentence.word, sentence.wordTranslate, b64);
    if (sentence.isCorrect) {
      correct += 1;
      correctField.insertAdjacentHTML('beforeend', element);
      correctField.querySelector('span').innerText = `${correct}`;
      successFields.push(`${sentence.word} - ${sentence.wordTranslate}`);
    }
    if (sentence.isError) {
      error += 1;
      errorField.insertAdjacentHTML('beforeend', element);
      errorField.querySelector('span').innerText = `${error}`;
      errorFields.push(`${sentence.word} - ${sentence.wordTranslate}`);
    }
  });

  document.querySelectorAll('.modal-round .btn_pronoucing').forEach((button) => {
    button.addEventListener('click', () => {
      const audio = button.querySelector('audio');
      playAudio(audio.src);
    });
  });
}

export function createStaticticsRound() {
  const statisticElement = `
  <div id="modal-close-default" uk-modal class='modal audiochallenge__modal-game-stat'>
    <div class="uk-modal-dialog modal-round" bg-close="false" esc-close="false">
      <div class="uk-modal-header">
        <h2>Результаты</h2>
      </div>
      <div uk-overflow-auto class="uk-modal-body">
        <div class="modal-round__correct">
          <h3>Я знаю<span>0</span></h3>
        </div>
        <div class="modal-round__error">
          <h3>Я не знаю<span>0</span</h3>
        </div>
      </div>
      <div class="uk-modal-footer">
        <button id="modal-btn-close">Закрыть</button>
        <button id="modal-btn-report">Создать отчет</button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', statisticElement);

  document.getElementById('modal-btn-close').addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    UIkit.modal('.modal-round').hide();
  });

  document.getElementById('modal-btn-report').addEventListener('click', () => {
    errorFields.push('\r\n\r\n');

    const text = `Отчет по игре "Аудиовызов"\r\n\r\n${errorFields.join('\r\n')}${successFields.join('\r\n')}`;
    downloadHelper.download(`audiochallenge-report_${new Date().toISOString()}.txt`, text);
  });
}
