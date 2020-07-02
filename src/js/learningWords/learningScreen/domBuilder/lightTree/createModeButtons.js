export function createModeButtons(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML(
    'beforeend',
    `
<div slot='modeButton' class='modeButton newWord clickable opened'>Новые слова</div>
<div slot='modeButton' class='modeButton learning clickable opened'>Изучение</div>
<div slot='modeButton' class='modeButton repeating'>Исправление ошибок</div>
`,
  );
}

export function updateModeButtons(learningScreenElement) {
  if (learningScreenElement.state.mode === 'newWord') {
    learningScreenElement.querySelectorAll('div.modeButton')[0].classList.add('active');
  } else if (learningScreenElement.state.mode === 'learning') {
    learningScreenElement.querySelectorAll('div.modeButton')[1].classList.add('active');
  } else if (learningScreenElement.state.mode === 'repeating') {
    learningScreenElement.querySelectorAll('.modeButton').forEach((element) => {
      element.classList.remove('active');
      element.classList.remove('opened');
    });
    const repeatingButton = learningScreenElement.querySelector('.modeButton.repeating');
    repeatingButton.classList.add('active');
    repeatingButton.classList.add('opened');
  }
}
