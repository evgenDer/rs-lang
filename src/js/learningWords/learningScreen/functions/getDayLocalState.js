/* eslint-disable no-param-reassign */
import saveDayWords from './saveDayWords';
import saveDayLocalState from './saveDayLocalState';
import saveDayMode from './saveDayMode';

import { createNewWordsPack } from './createNewWordsPack';

export default async function getDayLocalState(learningScreenElemen) {
  let currentDate = new Date(Date.now());
  currentDate = currentDate.getDate();

  //const prevDate = JSON.parse(localStorage.getItem('dayLearningDate'));
  const prevDate = 10;

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

    let wordArrs = await createNewWordsPack(learningScreenElemen.settings.newWordCount, learningScreenElemen.settings.difficultyLevel, 0);
    let newWordsPack = wordArrs.newWords;
    newWordsPack.map((element) => Object.assign(element, {
      "difficulty": 'normal', // easy, normal, hard
      "optional": {
        mode: 'newWord', //deleted,null
        lastUpdateDate: Date.now(),
        referenceCount: 0,
        errorCount: 0,
        repeatCount: 0,
        rightSequence: 0,
        successPoint: 0, // [0,5]
      }
    }));
    console.log(newWordsPack);

    const dayWordArrs = {
      newWords: newWordsPack,
      learnedWords: wordArrs.learnedWords,
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
