import { createElement } from '../../utils/updated-create';
import crystal from '../../../img/crystal.png';

const createFooter = () => {
  const img = createElement({ tagName: 'img', classNames: 'crystal', attrs: [['src', crystal]] });
  const imgContainer = createElement({ tagName: 'div', children: [img] });
  const footer = createElement({ tagName: 'div', classNames: 'process__footer', children: [imgContainer] });
  return footer;
};

export default createFooter;
