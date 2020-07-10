import { createElementObj } from '../../utils/create';

export default class Microphone {
  constructor() {
    this.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  }

  generate() {
    const microphoneImg = createElementObj({ tagName: 'img', classNames: 'input_microphone-img', attrs: [['src', './assets/img/icons/microphone.svg'], ['alt', 'microphone']] });
    this.input = createElementObj({ tagName: 'input', classNames: 'input', attrs: [['type', 'text'], ['disabled', 'true']] });
    const container = createElementObj({ tagName: 'div', classNames: 'microphone-container', children: [ microphoneImg, this.input] });
    this.microphone= createElementObj({ tagName: 'div', classNames: 'microphone', children: [ container] });
    return this.microphone;
  }

  clearInput() {
    this.input.value = '';
  }

  turnOff() {
    this.speechRecognition.stop();
    this.speechRecognition.onend = null;
    this.microphone.classList.remove('microphone_active');
    this.input.placeholder = '';
    this.input.value = '';
  }

  turnOn(callback) {
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
