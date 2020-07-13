import { getRandomInt, shuffleArray } from '../helpers/math-hepler';

const COUNT_ANSWERS = 5;
const COUNT_LEVELS = 5;

export function addAnswer(number, word){
  const answer = `<div class="answer"><label><input type="radio" name='${number}'>  ${word}</label></div>`;
  return answer;
}

export function addAnswerField(data, words, level){
  const answerFieldElement = document.querySelector('.answers-field');
  for(let i = 0; i < COUNT_ANSWERS; i += 1){
    let resultField = '';
    const regexpExample = /<b>\w+<\/b>/;
    const example = data[i].textExample;
    let exampleUpdated = example.replace(regexpExample, '____');
    if(exampleUpdated.indexOf(`${data[i].word}`) !== -1 ){
      const replaceExampleUpdated =  exampleUpdated.replace(`${data[i].word}`, '');
      exampleUpdated = replaceExampleUpdated;
    }
    resultField  +=  `<div class="answers-field__row " data-number = ${i}>`;
    resultField += `<p>${i + 1 + level*COUNT_ANSWERS}. ${exampleUpdated}</p>`;
    shuffleArray(words);
    const index = getRandomInt(COUNT_ANSWERS);
    for(let j=0; j < COUNT_ANSWERS; j += 1){
      let word;
      if(index === j){
        word = data[i].word;
      }
      else {
        word = words[j];
      }
      const stringWord = addAnswer(i, word);
      resultField += `${stringWord}`;
    }
    resultField += `</div>`;
    answerFieldElement.insertAdjacentHTML('beforeend', resultField);
  }
  let btnNext = `<div><button  class = "main-card__body_btn-next">ПРОДОЛЖИТЬ</button></div>`;
  if(level === COUNT_LEVELS){
    btnNext = `<div><button  class = "main-card__body_btn-next">РЕЗУЛЬТАТЫ</button></div>`;
  }

  answerFieldElement.insertAdjacentHTML('beforeend', btnNext);
}
