/* eslint-disable no-param-reassign */
import saveDayWords from './saveDayWords';
import saveDayLocalState from './saveDayLocalState';
import saveDayMode from './saveDayMode';

import { createNewWordsPack } from './createNewWordsPack';

export default async function getDayLocalState(learningScreenElemen) {
  let currentDate = new Date(Date.now());
  currentDate = currentDate.getDate() + Math.floor(currentDate.getHours() * 100 / 24) / 100;

  const prevDate = JSON.parse(localStorage.getItem('dayLearningDate'));
  // const prevDate = 15;
  if (prevDate + Math.floor(400 / 24) / 100 >= currentDate) {
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
    const isHardMode = learningScreenElemen.settings.learning.isHardMode;
    let dayCurrentLocalState = {
      learningProgressArr: [],
      needToRepeatProgressArr: [],
      newWordProgressArr: [],
    };
    let dayCurrenWordArrs = {
      newWords: [],
      learnedWords: [],
      needToRepeat: [],
    };
    let dayCurrentStat = {
      currentRightAnswerSeries: 0,
      longestRightAnswerSeries: 0,
      rightAnswers: 0,
    };;

    if (Math.floor(prevDate) === Math.floor(currentDate) && !isHardMode) {
      dayCurrentLocalState = JSON.parse(window.localStorage.getItem('dayLearningLocalState'));
      dayCurrenWordArrs = JSON.parse(window.localStorage.getItem('dayLearningWordArrs'));
      dayCurrentStat = JSON.parse(window.localStorage.getItem('dayLearningStat'));

      if (dayCurrentLocalState === null) {
        dayCurrentLocalState = {
          learningProgressArr: [],
          needToRepeatProgressArr: [],
          newWordProgressArr: [],
        };
      }
      if (dayCurrenWordArrs === null) {
        dayCurrenWordArrs = {
          newWords: [],
          learnedWords: [],
          needToRepeat: [],
        };
      }
      if (dayCurrentStat === null) {
        dayCurrentStat = {
          currentRightAnswerSeries: 0,
          longestRightAnswerSeries: 0,
          rightAnswers: 0,
        };;
      }

      for (let arr in dayCurrentLocalState) {
        if (arr !== 'needToRepeatProgressArr') {
          dayCurrentLocalState[arr] = dayCurrentLocalState[arr].filter((element) => element);
        } else {
          dayCurrentLocalState[arr] = dayCurrentLocalState[arr].filter((element) => !element);
        }
      }

      dayCurrenWordArrs.learnedWords = dayCurrenWordArrs.learnedWords.slice(0, dayCurrentLocalState.learningProgressArr.length);
      dayCurrenWordArrs.newWords = dayCurrenWordArrs.newWords.slice(0, dayCurrentLocalState.newWordProgressArr.length);
      dayCurrenWordArrs.needToRepeat = dayCurrenWordArrs.needToRepeat.slice(-dayCurrentLocalState.needToRepeatProgressArr.length + 1);

    }


    learningScreenElemen.localState = {};
    learningScreenElemen.wordArrs = {};

    learningScreenElemen.setState('mode', 'newWord');
    const currentNWindex = dayCurrentLocalState.newWordProgressArr.length - 1 < 0 ? 0 : dayCurrentLocalState.newWordProgressArr.length - 1;
    const currenLindex = dayCurrentLocalState.learningProgressArr.length - 1 < 0 ? 0 : dayCurrentLocalState.learningProgressArr.length - 1;

    learningScreenElemen.setState('currentNewWordCardIndex', currentNWindex);
    learningScreenElemen.setState('currentLearningCardIndex', currenLindex);

    let cardToRepeatCount =
      learningScreenElemen.settings.wordCount - learningScreenElemen.settings.newWordCount - dayCurrentLocalState.learningProgressArr.length;
    if (cardToRepeatCount < 0) { cardToRepeatCount = 0; }

    let cardNewWordCount = learningScreenElemen.settings.newWordCount - dayCurrentLocalState.newWordProgressArr.length;
    if (cardNewWordCount < 0) { cardNewWordCount = 0; }

    let wordArrs = await createNewWordsPack(
      cardNewWordCount,
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

    for (let arr in dayWordArrs) {
      dayCurrenWordArrs[arr] = dayCurrenWordArrs[arr].concat(dayWordArrs[arr]);
    }
    for (let arr in dayLocalState) {
      dayCurrentLocalState[arr] = dayCurrentLocalState[arr].concat(dayLocalState[arr]);
    }

    Object.assign(learningScreenElemen.localState, dayCurrentLocalState);
    Object.assign(learningScreenElemen.wordArrs, dayCurrenWordArrs);
    Object.assign(learningScreenElemen.statistics, dayCurrentStat);

    window.localStorage.setItem('dayLearningDate', currentDate);
    saveDayMode(learningScreenElemen);
    saveDayLocalState(learningScreenElemen);
    saveDayWords(learningScreenElemen);
  }
}
