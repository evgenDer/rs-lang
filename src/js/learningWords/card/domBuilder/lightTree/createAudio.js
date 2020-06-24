export default function createAudio(cardElement) {
  const wordAudio = new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${cardElement.state.audio}`);
  cardElement.audio.word = wordAudio;

  const exampleAudio = cardElement.settings.showExplanationExample ?
    new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${cardElement.state.audioExample}`) : null;
  cardElement.audio.example = exampleAudio;

  const meaningAudio = cardElement.settings.showSentenceExplanation ?
    new Audio(`https://raw.githubusercontent.com/irinainina/rslang-data/master/${cardElement.state.audioMeaning}`) : null;
  cardElement.audio.meaning = meaningAudio;

}
