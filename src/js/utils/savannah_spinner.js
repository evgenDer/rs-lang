import { createElement } from './updated-create';

const spinnerCreator = (amount) => {
  const pows = [];
  const classNames = ['pad large', 'pad small-1', 'pad small-2', 'pad small-3', 'pad small-4'];
  for (let i = 1; i <= amount; i += 1) {
    const items = [];
    classNames.forEach((element) => {
      const div = createElement({ tagName: 'div', classNames: element });
      items.push(div);
    });
    const pawPrint = createElement({ tagName: 'div', classNames: `paw-print-${i}`, children: items });
    pows.push(pawPrint);
  }
  return createElement({ tagName: 'div', classNames: 'main-page-spinner', children: pows });
};

export default spinnerCreator;
