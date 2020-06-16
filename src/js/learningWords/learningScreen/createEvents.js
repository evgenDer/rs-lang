import createCard from './lightTree/createCard.js';

export default function createEvents(learningScreenElement) {
  learningScreenElement.addEventListener('click', () => {
    console.log(event.target);
    let item = null;
    if (event.target.closest('svg') != null) {
      item = event.target.closest('svg');
    }
    if (item != null) {
      switch (item.classList[0]) {
        case 'arrowSvg':
          if (item.classList[1] == 'right') {
            const currentCardIndex = learningScreenElement.state.currentCardIndex;
            if (currentCardIndex <= learningScreenElement.settings.newWordCount - 1) {
              learningScreenElement.querySelectorAll('div.dot')[currentCardIndex].classList.add('active');
            }
            learningScreenElement.state.currentCardIndex += 1;
          } else { learningScreenElement.state.currentCardIndex -= 1; }
          createCard(learningScreenElement);
          break;
        case '':

          break;
      }
    }
  })

}
