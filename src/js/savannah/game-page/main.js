/* eslint-disable no-restricted-globals */
import { createElement } from '../../utils/updated-create';

const createMain = () => {
  const answers = createElement({ tagName: 'ol', classNames: 'process__answers' });

  return { answers };
};


export default createMain;
