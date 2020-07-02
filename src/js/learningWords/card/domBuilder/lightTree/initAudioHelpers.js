export function initAudioHelpers(cardElement) {
  cardElement.insertAdjacentHTML(
    'beforeend',
    `  
    <img src='assets/img/icons/pause.svg' width='25px' height='25px' slot='audioHelperButton' class='stopAudioButton'>
  <img src='assets/img/icons/autoAudio.svg' width='25px' height='25px' slot='audioHelperButton' class='enableAudioButton opened'>`,
  );
}

export function updateEnableAudioHelper(cardElement) {
  const enableAudioButton = cardElement.querySelector('.enableAudioButton');
  if (cardElement.settings.enableAutomaticAudio) {
    enableAudioButton.src = 'assets/img/icons/autoAudio.svg';
  } else {
    enableAudioButton.src = 'assets/img/icons/autoAudioOff.svg';
  }
}

export function updateStopAudioHelper(cardElement) {
  const stopAudioButton = cardElement.querySelector('.stopAudioButton');
  if (cardElement.localState.isAudioPlaying) {
    stopAudioButton.classList.add('opened');
  } else {
    stopAudioButton.classList.remove('opened');
  }
}
