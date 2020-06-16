async function getCountWordsInGroup(numberGroup, wordsPerExampleSentence = 10, wordsPerPage = 20) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/count?group=${numberGroup}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const content = await rawResponse.json();
    return content.count;
  } catch (error) {
    return error;
  }
}

// eslint-disable-next-line max-len
async function getDataWords(numberGroup, numberPage, wordsPerExampleSentence = 10, wordsPerPage = 10) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/?group=${numberGroup}&page=${numberPage}&wordsPerExampleSentenceLTE=${wordsPerExampleSentence}&wordsPerPage=${wordsPerPage}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await rawResponse.json();
    return result;
  } catch (error) {
    return error;
  }
}

async function getWordById(idWord) {
  try {
    const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words/${idWord}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await rawResponse.json();
    return result;
  } catch (error) {
    return error;
  }
}

export { getCountWordsInGroup, getWordById, getDataWords };
