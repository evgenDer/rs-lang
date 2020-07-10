import { createElement } from '../../utils/updated-create';

const createHeader = (word, answerId = 1) => {
  const generalWord = createElement({
    tagName: 'h1', classNames: 'process__general-word animation-down', attrs: [['data-answer', answerId]], textContent: word,
  });
  const header = createElement({ tagName: 'div', classNames: 'process__header', children: [generalWord] });
  return header;
};

export default createHeader;
