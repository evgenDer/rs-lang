import { createElement } from '../../utils/updated-create';
import createHeader from './header';
import createMain from './main';
import createFooter from './footer';

const createProcessTemplate = () => {
  const { main, generalWord } = createMain();
  const header = createHeader(generalWord);
  const footer = createFooter();
  const process = createElement({ tagName: 'section', classNames: 'process', children: [header, main, footer] });

  document.body.append(process);
  setTimeout(() => {
    process.classList.add('show-after-click');
  }, 1000);
};

export default createProcessTemplate;
