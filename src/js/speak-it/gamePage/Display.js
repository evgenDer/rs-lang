import { createElement } from '../../utils/create';

export default class Display {
  constructor() {
    this.defaultImageSrc = './assets/img/speakit-default-img.jpg';
    this.speechRecognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  }

  generateDisplay() {
    this.image = createElement({ tagName: 'img', classNames: 'image', attrs: [['src', this.defaultImageSrc]] });
    this.input = createElement({ tagName: 'input', classNames: 'input', attrs: [['type', 'text'], ['disabled', 'true']] });
    const display = createElement({ tagName: 'div', classNames: 'display', children: [this.image, this.input] });
    return display;
  }

  updateDisplay({img, translate}) {
    if(img) {
      this.image.src = img;
    }else {
      this.image.src = this.defaultImageSrc;
    }
    if (translate) this.input.value = translate;
  }

  turnOffMicrophone() {
    this.speechRecognition.stop();
    this.speechRecognition.onend = null;
    this.input.classList.remove('input_active');
    this.input.placeholder = '';
    this.input.value = '';
    this.image.src = this.defaultImageSrc;
  }

  turnOnMicrophone(callback) {
    this.input.value = '';
    this.input.placeholder = 'Speak please';
    this.image.src = this.defaultImageSrc;
    this.input.classList.add('input_active');
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


  addListeners() {

    document.addEventListener('startPronunciationMode', () => {
      this.isPronunciationMode = true;
      this.currentCards.forEach((card) => card.makeInactive());
      this.turnOnMicrophone(
        (result) => {
          this.input.value = result;
          this.updateCityData(result);
        },
        () => {
          this.searchInput.placeholder = 'Speak please';
        }
      );
    });
  }
}
