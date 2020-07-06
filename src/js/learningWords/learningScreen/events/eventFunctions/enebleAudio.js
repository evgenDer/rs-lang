export default function enableAudio(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  learningScreenElement.settings.enableAutomaticAudio = !learningScreenElement.settings
    .enableAutomaticAudio;
  if (learningScreenElement.settings.enableAutomaticAudio) {
  }
}
