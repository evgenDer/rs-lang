export default function createResults(learningScreenElement) {
  learningScreenElement.insertAdjacentHTML(
    'beforeend',
    "<learning-results slot='results'></learning-results>",
  );
  const results = learningScreenElement.querySelector('learning-results');

  results.setState('wordCount', +learningScreenElement.settings.wordCount);
  results.setState('newWordCount', +learningScreenElement.settings.newWordCount);
  results.setState('errorCount', +learningScreenElement.localState.errorCount || 0);
  results.setState('noAnsweredCount', +learningScreenElement.localState.noAnsweredCount || 0);
}
