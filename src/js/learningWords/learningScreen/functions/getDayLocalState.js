/* eslint-disable no-param-reassign */
import saveDayWords from './saveDayWords';
import saveDayLocalState from './saveDayLocalState';
import saveDayMode from './saveDayMode';

export default function getDayLocalState(learningScreenElemen) {
  let currentDate = new Date(Date.now());
  currentDate = currentDate.getDate();
  const prevDate = JSON.parse(localStorage.getItem('dayLearningDate'));
  // const prevDate = 10;

  if (prevDate === currentDate) {
    const dayLocalState = window.localStorage.getItem('dayLearningLocalState');
    const dayWordArrs = window.localStorage.getItem('dayLearningWordArrs');

    learningScreenElemen.localState = JSON.parse(dayLocalState);
    learningScreenElemen.wordArrs = JSON.parse(dayWordArrs);

    const dayMode = window.localStorage.getItem('dayLearningMode');
    const firstNoLearnedNewWordIndex =
      learningScreenElemen.localState.newWordProgressArr.indexOf(false) >= 0
        ? learningScreenElemen.localState.newWordProgressArr.indexOf(false)
        : 0;
    const firstNoLearnedWordIndex =
      learningScreenElemen.localState.learningProgressArr.indexOf(false) >= 0
        ? learningScreenElemen.localState.learningProgressArr.indexOf(false)
        : 0;
    learningScreenElemen.setState('mode', dayMode);
    learningScreenElemen.setState('currentNewWordCardIndex', firstNoLearnedNewWordIndex);
    learningScreenElemen.setState('currentLearningCardIndex', firstNoLearnedWordIndex);
  } else {
    learningScreenElemen.localState = [];
    learningScreenElemen.wordArrs = [];
    learningScreenElemen.setState('mode', 'newWord');
    learningScreenElemen.setState('currentNewWordCardIndex', 0);
    learningScreenElemen.setState('currentLearningCardIndex', 0);
    // getWords()
    const dayWordArrs = {
      newWords: [
        {
          id: '5e9f5ee35eb9e72bc21af565',
          group: 0,
          page: 9,
          word: 'site',
          image: 'files/10_0198.jpg',
          audio: 'files/10_0198.mp3',
          audioMeaning: 'files/10_0198_meaning.mp3',
          audioExample: 'files/10_0198_example.mp3',
          textMeaning: 'A <i>site</i> is a place.',
          textExample: 'We found the perfect <b>site</b> for our picnic.',
          transcription: '[sait]',
          textExampleTranslate: 'Мы нашли идеальное место для нашего пикника',
          textMeaningTranslate: 'Сайт - это место',
          wordTranslate: 'сайт',
          wordsPerExampleSentence: 8,
        },
        {
          id: '5e9f5ee35eb9e72bc21af569',
          group: 0,
          page: 10,
          word: 'aware',
          image: 'files/11_0202.jpg',
          audio: 'files/11_0202.mp3',
          audioMeaning: 'files/11_0202_meaning.mp3',
          audioExample: 'files/11_0202_example.mp3',
          textMeaning:
            'If someone is <i>aware</i>, they know that something or a situation exists.',
          textExample: 'The student became <b>aware</b> that the teacher was watching him.',
          transcription: '[əwέər]',
          textExampleTranslate: 'Ученик осознал, что учитель следит за ним',
          textMeaningTranslate: 'Если кто-то знает, он знает, что что-то или ситуация существует',
          wordTranslate: 'знают',
          wordsPerExampleSentence: 10,
        },
        {
          id: '5e9f5ee35eb9e72bc21af56a',
          group: 0,
          page: 10,
          word: 'battery',
          image: 'files/11_0203.jpg',
          audio: 'files/11_0203.mp3',
          audioMeaning: 'files/11_0203_meaning.mp3',
          audioExample: 'files/11_0203_example.mp3',
          textMeaning:
            'A <i>battery</i> is an object placed inside something to supply it with electricity.',
          textExample: 'My brother needs a <b>battery</b> for his clock.',
          transcription: '[bǽtəri]',
          textExampleTranslate: 'Моему брату нужна батарея для его часов',
          textMeaningTranslate:
            'Батарея - это объект, помещенный внутрь чего-либо, чтобы обеспечить его электричеством',
          wordTranslate: 'батарея',
          wordsPerExampleSentence: 8,
        },
      ],
      learnedWords: [
        {
          id: '5e9f5ee35eb9e72bc21af565',
          group: 0,
          page: 9,
          word: 'site',
          image: 'files/10_0198.jpg',
          audio: 'files/10_0198.mp3',
          audioMeaning: 'files/10_0198_meaning.mp3',
          audioExample: 'files/10_0198_example.mp3',
          textMeaning: 'A <i>site</i> is a place.',
          textExample: 'We found the perfect <b>site</b> for our picnic.',
          transcription: '[sait]',
          textExampleTranslate: 'Мы нашли идеальное место для нашего пикника',
          textMeaningTranslate: 'Сайт - это место',
          wordTranslate: 'сайт',
          wordsPerExampleSentence: 8,
        },
        {
          id: '5e9f5ee35eb9e72bc21af569',
          group: 0,
          page: 10,
          word: 'aware',
          image: 'files/11_0202.jpg',
          audio: 'files/11_0202.mp3',
          audioMeaning: 'files/11_0202_meaning.mp3',
          audioExample: 'files/11_0202_example.mp3',
          textMeaning:
            'If someone is <i>aware</i>, they know that something or a situation exists.',
          textExample: 'The student became <b>aware</b> that the teacher was watching him.',
          transcription: '[əwέər]',
          textExampleTranslate: 'Ученик осознал, что учитель следит за ним',
          textMeaningTranslate: 'Если кто-то знает, он знает, что что-то или ситуация существует',
          wordTranslate: 'знают',
          wordsPerExampleSentence: 10,
        },
        {
          id: '5e9f5ee35eb9e72bc21af56a',
          group: 0,
          page: 10,
          word: 'battery',
          image: 'files/11_0203.jpg',
          audio: 'files/11_0203.mp3',
          audioMeaning: 'files/11_0203_meaning.mp3',
          audioExample: 'files/11_0203_example.mp3',
          textMeaning:
            'A <i>battery</i> is an object placed inside something to supply it with electricity.',
          textExample: 'My brother needs a <b>battery</b> for his clock.',
          transcription: '[bǽtəri]',
          textExampleTranslate: 'Моему брату нужна батарея для его часов',
          textMeaningTranslate:
            'Батарея - это объект, помещенный внутрь чего-либо, чтобы обеспечить его электричеством',
          wordTranslate: 'батарея',
          wordsPerExampleSentence: 8,
        },
      ],
    };

    const newWordProgressArr = Array(+learningScreenElemen.settings.newWordCount).fill(false);
    const learningProgressArr = Array(+learningScreenElemen.settings.wordCount).fill(false);
    const dayLocalState = {
      newWordProgressArr,
      learningProgressArr,
      deletedArr: learningProgressArr,
    };

    Object.assign(learningScreenElemen.localState, dayLocalState);
    Object.assign(learningScreenElemen.wordArrs, dayWordArrs);
    window.localStorage.setItem('dayLearningDate', currentDate);
    saveDayMode(learningScreenElemen);
    saveDayLocalState(learningScreenElemen);
    saveDayWords(learningScreenElemen);
  }
}
