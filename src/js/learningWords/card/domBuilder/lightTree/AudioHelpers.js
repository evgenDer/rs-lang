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
