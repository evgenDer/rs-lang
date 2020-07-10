import { createElementObj } from '../../utils/create';

export default class Microphone {
  constructor() {
    this.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  }

  generate() {
    this.microphoneImg = createElementObj({ tagName: 'img', classNames: 'input_microphone-img', attrs: [['src', './assets/img/icons/microphone.svg'], ['alt', 'microphone']] });
    this.input = createElementObj({ tagName: 'input', classNames: 'input', attrs: [['type', 'text'], ['disabled', 'true']] });
    const container = createElementObj({ tagName: 'div', classNames: 'microphone-container', children: [ this.microphoneImg, this.input] });
    this.microphone= createElementObj({ tagName: 'div', classNames: 'microphone', children: [ container] });
    return this.microphone;
  }

  clearInput() {
    this.input.value = '';
  }

  turnOnPause() {
    this.speechRecognition.stop();
    this.speechRecognition.onend = null;
    this.input.placeholder = 'Микрофон отключен';
    this.input.value = '';
    this.microphoneImg.src ='./assets/img/icons/microphoneOff.svg'
    this.microphoneImg.classList.add('input_microphone-img_off');
  }

  turnOff() {
    this.speechRecognition.stop();
    this.speechRecognition.onend = null;
    this.microphone.classList.remove('microphone_active');
    this.input.value = '';
  }

  turnOn(callback) {
    this.microphoneImg.src ='./assets/img/icons/microphone.svg'
    this.microphoneImg.classList.remove('input_microphone-img_off');
    this.input.value = '';
    this.input.placeholder = 'Говорите';
    this.microphone.classList.add('microphone_active');
    this.speechRecognition.lang = 'en-US';
    this.speechRecognition.interimResults = false;
    this.speechRecognition.start();

    this.speechRecognition.onresult = (event) => {
      if (event.results.length > 0) {
        const spokenWord = event.results[0][0].transcript;
        this.input.value = spokenWord;
        callback(spokenWord);
      }
    };

    this.speechRecognition.onend = () => {
      this.speechRecognition.start();
    };
  }
}
