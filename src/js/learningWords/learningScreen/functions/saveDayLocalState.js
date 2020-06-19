export default function saveDayLocalState(learningScreenElemen) {
  const currentDate = new Date(Date.now());
  const item = Object.assign({}, learningScreenElemen.localState);
  const json = JSON.stringify(item);
  window.localStorage.setItem('dayLearningDate', currentDate.getDate());
  window.localStorage.setItem('dayLearningLocalState', json);
}
