export default function createStatusBar(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML('beforeend', `
  <div slot='progressLine' style='width:0%;'></div>
  <span slot='numberStatus'></span>`
  )
}

export function updateStatusBar(learningScreenElement) {
  const mode = learningScreenElement.state.mode;
  const allWordCount = learningScreenElement.wordArrs.newWords.length + learningScreenElement.wordArrs.learnedWords.length;
  const doneWordCount = learningScreenElement.localState.newWordProgressArr.filter((element) => element).length
    + learningScreenElement.localState.learningProgressArr.filter((element) => element).length;

  const progressLine = learningScreenElement.querySelector('[slot=progressLine]');
  const numberStatus = learningScreenElement.querySelector('[slot=numberStatus]');

  const widthPercent = Math.floor(doneWordCount * 100 / allWordCount);
  progressLine.style.width = `${widthPercent}%`;
  numberStatus.innerHTML = `${doneWordCount}/${allWordCount}`
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
