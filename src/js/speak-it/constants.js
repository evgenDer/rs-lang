export const TYPE_MICROPHONE_MESSAGE = {
  nextWord: 'nextWord',
  error: 'error',
  right: 'right',
}
export const MICROPHONE_MESSAGE = {
  [TYPE_MICROPHONE_MESSAGE.nextWord]: {
    text: 'Извините, наш робот не может разобрать, что вы говорите. <br> Повторим это слово в другой раз.',
    color: '#f0506ea3',
  },
  [TYPE_MICROPHONE_MESSAGE.error]: {
    text: 'Не совсем верно. Повторим еще раз.',
    color: '#c377e073',
  },
  [TYPE_MICROPHONE_MESSAGE.right]: {
    text: 'Отлично! Вы говорите как настоящий англичанин.',
    color: '#61bd4f73',
  },
}

export const LEVELS_NUMBER = 6;
export const ROUNDS_NUMBER = 60;
export const MAX_ATTEMTS_COUNT = 4;

export const MODE_INFO = {
  studied: {
    textMessage: 'В игре будут задей- <br> ствованы только <br> изученные слова',
    textBtn: 'Слова: Изученные',
  },
  all: {
    textMessage: 'В игре будут задей- <br> ствованы слова из <br> всей коллекции',
    textBtn: 'Слова: все',
  },
}

export const DEFAULT_DISPLAY_IMG = './assets/img/speakit-default-img.jpg';
