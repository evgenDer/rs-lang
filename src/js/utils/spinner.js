import { createElement } from './updated-create';

const createSpinner = () => {
  const spins = ['inner one', 'inner two', 'inner three'].map((item) => createElement({ tagName: 'div', classNames: item }));
  const loader = createElement({ tagName: 'div', classNames: 'loader', children: spins });
  const loaderWrap = createElement({ tagName: 'div', classNames: 'loader-wrap', children: [loader] });
  return loaderWrap;
};

export default createSpinner;
