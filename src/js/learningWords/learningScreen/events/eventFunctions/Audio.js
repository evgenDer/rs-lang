import { updateStopAudioHelper } from '../../../card/domBuilder/lightTree/AudioHelpers';

export function stopAudio(card) {
  card.localState.isAudioPlaying = false;
  card.audio.word.pause();
  card.audio.example.pause();
  card.audio.meaning.pause();
  updateStopAudioHelper(card);
}

export function playAudio(card) {
  card.localState.isAudioPlaying = true;
  updateStopAudioHelper(card);
  card.audio.word.play();
  card.audio.word.onended = () => {
    if (card.settings.showExplanationExample && card.audio.example !== null) {
      card.audio.example.play();
      card.audio.example.onended = () => {
        if (card.settings.showSentenceExplanation && card.audio.meaning !== null) {
          card.audio.meaning.play();
          card.audio.meaning.onended = () => {
            stopAudio(card);
          };
        }
      };
    }
  };
}
