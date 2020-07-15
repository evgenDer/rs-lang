import { stopAudio, playAudio } from '../helpers/audio';

export function addAudioButtonClickHandler() {
  const btnAudio = document.querySelector('button.game-container_audio');
  const imgBtn = btnAudio.querySelector('img');
  btnAudio.addEventListener('click', () => {
    if(btnAudio.classList.contains('off')){
      btnAudio.classList.remove('off');
      imgBtn.src = 'assets/img/icons/sound-on.svg';
    } else {
      btnAudio.classList.add('off');
      imgBtn.src = 'assets/img/icons/sound-off.svg'; }
      stopAudio();
  });
}

export function playAudioInSprint(audioSrc){
  const btnAudio = document.querySelector('button.game-container_audio');
  if(!btnAudio.classList.contains('off')){
    playAudio(audioSrc);
  }
}


