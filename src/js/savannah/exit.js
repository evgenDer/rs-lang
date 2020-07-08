import { createElement } from '../utils/updated-create';

/* eslint-disable no-undef */
const closeGame = (e) => {
  e.preventDefault();
  e.target.blur();

  const pText = 'Если вы вернетесь к списку, ваши результаты не будут сохранены';
  const h4Text = 'Тренировка не закончена!';
  const br = createElement({ tagName: 'br' });
  const hr = createElement({ tagName: 'hr' });
  const p = createElement({ tagName: 'p', textContent: pText });
  const h4 = createElement({ tagName: 'h4', classNames: 'close__alert', textContent: h4Text });
  const div = createElement({ tagName: 'div', children: [h4, hr, br, p] });
  UIkit.modal.confirm(div).then(() => {
    document.location.href = 'http://localhost:8080/';
  }, () => {
    // console.log('Rejected.');

  });
};


export default closeGame;
