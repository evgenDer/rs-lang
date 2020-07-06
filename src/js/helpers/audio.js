const audio = new Audio();

export function playAudio(pathToSound){
  // audio.stop();
  audio.src = pathToSound;
  audio.autoplay = true;
}

export function stopAudio(){
  audio.autoplay = false;
  audio.currentTime = 0.0;
  audio.pause();
}
