import { createElement } from '../../utils/create';

export default class Microphone {
  constructor() {
    this.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  }

  generate() {
    this.input = createElement({ tagName: 'input', classNames: 'input', attrs: [['type', 'text'], ['disabled', 'true']] });
    this.microphone= createElement({ tagName: 'div', classNames: 'microphone', children: [ this.input] });
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
