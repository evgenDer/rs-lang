const audio = new Audio();

HTMLAudioElement.prototype.stop = () => {
  this.currentTime = 0.0;
};

export default function playAudio(pathToSound) {
  audio.src = pathToSound;
  audio.autoplay = true;
}
