import { getRandomInt, shuffleArray } from '../helpers/math-hepler';

const COUNT = 5;

export function addAnswer(number, word){
  const answer = `<div class="answer"><label><input type="radio" name='${number}'>  ${word}</label></div>`;
  return answer;
}

export function addAnswerField(data, words, level){
  const answerFieldElement = document.querySelector('.answers-field');
  for(let i = 0; i < COUNT; i += 1){
    let resultField = '';
    const regexpExample = /<b>\w+<\/b>/;
    console.log(data);
    const example = data[i].textExample;
    let exampleUpdated = example.replace(regexpExample, '____');
    if(exampleUpdated.indexOf(`${data[i].word}`)){
      const replaceExampleUpdated =  exampleUpdated.replace(`${data[i].word}`, '');
      exampleUpdated = replaceExampleUpdated;
    }
    resultField  +=  `<div class="answers-field__row " data-number = ${i}>`;
    resultField += `<p>${i + 1 + level*COUNT}. ${exampleUpdated}</p>`;
    shuffleArray(words);
    const index = getRandomInt(COUNT);
    for(let j=0; j < COUNT; j += 1){
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
  if(level === COUNT){
    btnNext = `<div><button  class = "main-card__body_btn-next">РЕЗУЛЬТАТЫ</button></div>`;
  }

  answerFieldElement.insertAdjacentHTML('beforeend', btnNext);
}
