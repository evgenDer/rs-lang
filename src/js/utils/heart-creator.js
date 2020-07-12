import { createElement } from './updated-create';
import heart from '../../img/icons/heart.svg';

const heartCreator = () => {
  const hearts = [];
  for (let i = 0; i < 5; i += 1) {
    const heartImg =
    createElement({ tagName: 'img', classNames: 'process__heart', attrs: [['src', heart]] });
    hearts.push(heartImg);
  }
  return hearts;
};

export default heartCreator;
