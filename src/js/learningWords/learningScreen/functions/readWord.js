export default function readIt(word) {
  const msg = new SpeechSynthesisUtterance();
  msg.pitch = 1;
  msg.rate = 1;
  msg.volume = 1;
  msg.text = word;
  speechSynthesis.speak(msg);
}
