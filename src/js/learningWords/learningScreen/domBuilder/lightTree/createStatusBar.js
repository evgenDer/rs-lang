export default function createStatusBar(learningScreenElement) {
  for (let i = 0; i < learningScreenElement.settings.newWordCount; i += 1) {
    learningScreenElement.insertAdjacentHTML('beforeend', `
    <div class='dot newWordDot'  slot='newWordStatusPoint'></div>`);
    if (learningScreenElement.localState.newWordProgressArr[i]) {
      learningScreenElement.querySelectorAll('div.dot.newWordDot')[i].classList.add('active');
    }
  }
  for (let i = 0; i < learningScreenElement.settings.wordCount; i += 1) {
    learningScreenElement.insertAdjacentHTML('beforeend', `
    <div class='dot learningWordDot' slot='learningStatusPoint'></div>`);
    if (learningScreenElement.localState.learningProgressArr[i]) {
      learningScreenElement.querySelectorAll('div.dot.learningWordDot')[i].classList.add('success');
    }
    if (learningScreenElement.localState.deletedArr[i]) {
      learningScreenElement.querySelectorAll('div.dot.learningWordDot')[i].classList.add('deleted');
    }
  }


  /*
    const dotArr = learningScreenElement.querySelectorAll('div.dot') || [];
    if (dotArr.length > 0) {
      dotArr.forEach(element => {
        element.remove();
      });
    }


    switch (learningScreenElement.state.mode) {
      case 'newWord':
        for (let i = 0; i < learningScreenElement.settings.newWordCount; i += 1) {
          learningScreenElement.insertAdjacentHTML('beforeend', `
          <div class='dot newWordDot'  slot='statusPoint'></div>`)
          if (learningScreenElement.localState.newWordProgressArr[i]) {
            learningScreenElement.querySelectorAll(`div.dot`)[i].classList.add('active');
          }
        }

        break;
      case 'learning':
        console.log(learningScreenElement.settings.wordCount)
        for (let i = 0; i < learningScreenElement.settings.wordCount; i += 1) {
          console.log('123123')
          learningScreenElement.insertAdjacentHTML('beforeend', `
          <div class='dot learningWordDot' slot='statusPoint'></div>`)
          if (learningScreenElement.localState.learningProgressArr[i]) {
            learningScreenElement.querySelectorAll(`div.dot`)[i].classList.add('success');
          }
        }
        break;
    }
    */
}
