export default function createStatusBar(learningScreenElement) {
  for (let i = 0; i < learningScreenElement.settings.newWordCount; i += 1) {
    learningScreenElement.insertAdjacentHTML('beforeend', `
    <div class='dot newWordDot'  slot='statusPoint'></div>`)
  }
  for (let i = 0; i < learningScreenElement.settings.wordCount; i += 1) {
    learningScreenElement.insertAdjacentHTML('beforeend', `
    <div class='dot learningWordDot' slot='statusPoint'></div>`)
  }
}
