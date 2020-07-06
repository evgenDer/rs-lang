const audio = new Audio();

HTMLAudioElement.prototype.stop =  () => {
  // this.pause();
  this.currentTime = 0.0;
};

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
