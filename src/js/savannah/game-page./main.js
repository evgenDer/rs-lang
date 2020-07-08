/* eslint-disable no-restricted-globals */
import { createElement } from '../../utils/updated-create';
import rnd from '../../utils/rnd';
import store from '../store/store';
import { checkOnDublicateAction } from '../store/action-creators/dublicate';


const createMain = () => {
  const { words, dublicate } = store.getState();
  const generalWordNbr = dublicate.length;
  const gameWords = [];
  const queue = [];
  const generalWord = words[generalWordNbr].word;
  store.dispatch(checkOnDublicateAction(generalWordNbr));

  for (let i = 1; i < 5; i += 1) {
    const number = rnd(19, queue);
    let nbr = i === 1 ? generalWordNbr : number;
    if (isNaN(nbr)) {
      if (generalWordNbr < 19) {
        nbr = 19;
      } else {
        nbr = 1;
      }
    }
    queue.push(nbr);
    const word = createElement({
      tagName: 'li', classNames: 'process__answer', attrs: [['data-answer', i]], textContent: words[nbr].wordTranslate,
    });
    gameWords.push(word);
  }

  const answers = createElement({ tagName: 'ol', classNames: 'process__answers', children: gameWords });
  const main = createElement({ tagName: 'div', classNames: 'process__main', children: [answers] });
  return { main, generalWord };
};


export default createMain;
