export default function saveDayWords(learningScreenElemen) {
  const currentDate = new Date(Date.now());
  const item = Object.assign({}, learningScreenElemen.wordArrs);
  const json = JSON.stringify(item);
  window.localStorage.setItem('dayLearningDate', currentDate.getDate());
  window.localStorage.setItem('dayLearningWordArrs', json);
}
