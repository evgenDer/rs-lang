export default function saveDayLocalState(learningScreenElemen) {
  const currentDate = new Date(Date.now());
  const stateItem = { ...learningScreenElemen.localState };
  const arrItem = { ...learningScreenElemen.wordArrs };
  const stat = { ...learningScreenElemen.statistics };

  window.localStorage.setItem('dayLearningDate', currentDate.getDate() + Math.floor(currentDate.getHours() * 100 / 24) / 100);
  window.localStorage.setItem('dayLearningLocalState', JSON.stringify(stateItem));
  window.localStorage.setItem('dayLearningWordArrs', JSON.stringify(arrItem));
  window.localStorage.setItem('dayLearningStat', JSON.stringify(stat));
}
