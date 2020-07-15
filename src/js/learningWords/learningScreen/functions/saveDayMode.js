export default function saveDayMode(learningScreenElemen) {
  const currentDate = new Date(Date.now());
  window.localStorage.setItem('dayLearningDate', currentDate.getDate() + Math.floor(currentDate.getHours() * 100 / 24) / 100);
  window.localStorage.setItem('dayLearningMode', learningScreenElemen.state.mode);
}
