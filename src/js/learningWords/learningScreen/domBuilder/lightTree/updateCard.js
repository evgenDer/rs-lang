export default function updateCard(learningScreenElement) {
  const card = learningScreenElement.querySelector('card-word');
  const mode = learningScreenElement.state.mode;
  let cardIndex = 0;
  if (mode === 'learning') {
    cardIndex = learningScreenElement.state.currentLearningCardIndex;
    card.setState(
      'isDone',
      learningScreenElement.localState.learningProgressArr[cardIndex],
    )
  } else if (mode === 'newWord') {
    cardIndex = learningScreenElement.state.currentNewWordCardIndex;
    card.setState(
      'isDone',
      learningScreenElement.localState.newWordProgressArr[cardIndex],
    );
  } else {
    cardIndex = learningScreenElement.state.currentRepeatingCardIndex;
    card.setState(
      'isDone',
      learningScreenElement.localState.needToRepeatProgressArr[cardIndex],
    );
  }


}
