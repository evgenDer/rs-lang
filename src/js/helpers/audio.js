const audio = new Audio();

HTMLAudioElement.prototype.stop =  () => {
  // this.pause();
  this.currentTime = 0.0;
};

export default function playAudio(pathToSound){
  // audio.stop();
  audio.src = pathToSound;
  audio.autoplay = true;
}
