import createCard from '../../domBuilder/lightTree/createCard.js';
import switchCardMode from '../eventFunctions/switchCardMode.js';

export default function leftClick(learningScreenElement) {
  if (learningScreenElement.state.mode == 'newWord') {
    if (learningScreenElement.state.currentNewWordCardIndex > 0) {
      learningScreenElement.state.currentNewWordCardIndex -= 1;
      createCard(learningScreenElement);
    }
  } else {
    if ((learningScreenElement.state.currentLearningCardIndex == 0) && (learningScreenElement.state.mode == 'learning')) {
      let lastCheckedNewWordIndex = learningScreenElement.localState.newWordProgressArr.indexOf(false);
      if (lastCheckedNewWordIndex == -1) { lastCheckedNewWordIndex = 0 };

      learningScreenElement.setState('currentNewWordCardIndex', lastCheckedNewWordIndex);
      switchCardMode(learningScreenElement);
    } else if (learningScreenElement.state.currentLearningCardIndex > 0) {
      learningScreenElement.state.currentLearningCardIndex -= 1;
    }
    createCard(learningScreenElement);
  }
}
