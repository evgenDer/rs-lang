export default function createAudio(cardElement) {
  const wordAudio = new Audio();
  if (cardElement.state.audio.length > 30) {
    wordAudio.src = `data:audio/mp3;base64,${cardElement.state.audio}`;
  } else {
    wordAudio.src = `https://raw.githubusercontent.com/irinainina/rslang-data/master/${cardElement.state.audio}`;
  }
  cardElement.audio.word = wordAudio;

  const exampleAudio = new Audio();
  if (cardElement.state.audioExample.length > 30) {
    exampleAudio.src = `data:audio/mp3;base64,${cardElement.state.audioExample}`;
  } else {
    exampleAudio.src = `https://raw.githubusercontent.com/irinainina/rslang-data/master/${cardElement.state.audioExample}`;
  }
  cardElement.audio.example = exampleAudio;

  const meaningAudio = new Audio();
  if (cardElement.state.audioMeaning.length > 30) {
    meaningAudio.src = `data:audio/mp3;base64,${cardElement.state.audioMeaning}`;
  } else {
    meaningAudio.src = `https://raw.githubusercontent.com/irinainina/rslang-data/master/${cardElement.state.audioMeaning}`;
  }
  cardElement.audio.meaning = meaningAudio;
}
