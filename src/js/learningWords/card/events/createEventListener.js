/* eslint-disable no-restricted-globals */

import { stopAudio } from '../../learningScreen/events/eventFunctions/Audio';
import { updateEnableAudioHelper } from '../domBuilder/lightTree/AudioHelpers';
import saveSettingsFromLearningWords from '../../learningScreen/functions/saveSettings';

export default function createEventListener(card) {
  card.addEventListener('click', () => {
    if (
      event.target.closest('[slot=pronunciation]') != null ||
      event.target.closest('[slot=transcription]') != null
    ) {
      card.audio.word.play();
    } else if (event.target.closest('.stopAudioButton') != null) {
      stopAudio(card);
    } else if (event.target.closest('.enableAudioButton') != null) {
      card.settings.enableAutomaticAudio = !card.settings.enableAutomaticAudio;
      const learningScreen = document.querySelector('learning-screen');
      learningScreen.settings.enableAutomaticAudio = card.settings.enableAutomaticAudio;
      stopAudio(card);
      updateEnableAudioHelper(card);
      saveSettingsFromLearningWords(learningScreen);
    } else if (event.target.closest('.translateOptionsButton') != null) {
      const translateOptionsButton = card.querySelector('[slot=translateOptionsButton]');
      const translateOptions = card.querySelector('[slot=translateOptions]');
      translateOptionsButton.classList.toggle('active');
      translateOptions.classList.toggle('opened');
    }
  });

  card.addEventListener('keydown', () => {
    const word2 = card.querySelector('[slot=word2]');
    if (word2 != null) {
      word2.remove();
    }
  });
}
