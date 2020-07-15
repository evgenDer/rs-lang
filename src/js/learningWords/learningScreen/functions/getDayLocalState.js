/* eslint-disable no-param-reassign */
import saveDayWords from './saveDayWords';
import saveDayLocalState from './saveDayLocalState';
import saveDayMode from './saveDayMode';

import { createNewWordsPack } from './createNewWordsPack';

export default async function getDayLocalState(learningScreenElemen) {
  let currentDate = new Date(Date.now());
  currentDate = currentDate.getDate() + Math.floor(currentDate.getHours() * 100 / 24) / 100;

  const prevDate = JSON.parse(localStorage.getItem('dayLearningDate'));
  //const prevDate = 10;
  if (prevDate + 4 >= currentDate) {
    const dayLocalState = window.localStorage.getItem('dayLearningLocalState');
    const dayWordArrs = window.localStorage.getItem('dayLearningWordArrs');
    const dayStat = window.localStorage.getItem('dayLearningStat');

    learningScreenElemen.localState = JSON.parse(dayLocalState);
    learningScreenElemen.wordArrs = JSON.parse(dayWordArrs);
    learningScreenElemen.statistics = JSON.parse(dayStat);

    const dayMode = window.localStorage.getItem('dayLearningMode');
    const firstNoLearnedNewWordIndex =
      learningScreenElemen.localState.newWordProgressArr.indexOf(false) >= 0
        ? learningScreenElemen.localState.newWordProgressArr.indexOf(false)
        : 0;
    const firstNoLearnedWordIndex =
      learningScreenElemen.localState.learningProgressArr.indexOf(false) >= 0
        ? learningScreenElemen.localState.learningProgressArr.indexOf(false)
        : 0;
    const firstNoRepeatedWordIndex =
      learningScreenElemen.localState.needToRepeatProgressArr.indexOf(false) >= 0
        ? learningScreenElemen.localState.needToRepeatProgressArr.indexOf(false)
        : 0;
    learningScreenElemen.setState('mode', dayMode);
    learningScreenElemen.setState('currentRepeatingCardIndex', firstNoRepeatedWordIndex);
    learningScreenElemen.setState('currentNewWordCardIndex', firstNoLearnedNewWordIndex);
    learningScreenElemen.setState('currentLearningCardIndex', firstNoLearnedWordIndex);
  } else {
    learningScreenElemen.localState = {};
    learningScreenElemen.wordArrs = {};
    learningScreenElemen.setState('mode', 'newWord');
    learningScreenElemen.setState('currentNewWordCardIndex', 0);
    learningScreenElemen.setState('currentLearningCardIndex', 0);

    let cardToRepeatCount =
      learningScreenElemen.settings.wordCount - learningScreenElemen.settings.newWordCount;
    if (cardToRepeatCount < 0) {
      cardToRepeatCount = 0;
    }
    const isHardMode = learningScreenElemen.settings.learning.isHardMode;
    let wordArrs = await createNewWordsPack(
      learningScreenElemen.settings.newWordCount,
      cardToRepeatCount,
      learningScreenElemen.settings.learning.groupNumber,
      learningScreenElemen.settings.learning.learningWordsPage,
      isHardMode,
    );
    const dayWordArrs = wordArrs;

    const newWordProgressArr = Array(+dayWordArrs.newWords.length).fill(false);
    const learningProgressArr = Array(+dayWordArrs.learnedWords.length).fill(false);
    const dayLocalState = {
      newWordProgressArr,
      learningProgressArr,
      needToRepeatProgressArr: [],
    };

    Object.assign(learningScreenElemen.localState, dayLocalState);
    Object.assign(learningScreenElemen.wordArrs, dayWordArrs);
    window.localStorage.setItem('dayLearningDate', currentDate);
    saveDayMode(learningScreenElemen);
    saveDayLocalState(learningScreenElemen);
    saveDayWords(learningScreenElemen);
  }
}
