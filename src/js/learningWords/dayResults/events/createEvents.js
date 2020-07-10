import saveSettingsFromLearningWords from '../../learningScreen/functions/saveSettings';

/* eslint-disable no-restricted-globals */
export default function createEventListener(card) {
  card.addEventListener('click', async () => {
    if (event.target.closest('div[slot=buttonLeft]') != null) {
      const learningScreen = document.querySelector('learning-screen');
      await saveSettingsFromLearningWords(learningScreen, false);
      window.localStorage.setItem('dayLearningDate', '-1');
      window.location.href = 'learningWords.html';
    } else if (event.target.closest('div[slot=buttonRight') != null) {
    }
  });
}
