export default function saveDayMode(learningScreenElemen) {
  const currentDate = new Date(Date.now());
  window.localStorage.setItem('dayLearningDate', currentDate.getDate());
  window.localStorage.setItem('dayLearningMode', learningScreenElemen.state.mode);
}
