import { createElement } from '../../utils/updated-create';
import onSound from '../sound';
import heartCreator from '../../utils/heart-creator';
import dagger from '../../../img/icons/delete.svg';
import note from '../../../img/icons/note.svg';
import closeGame from '../exit';
// eslint-disable-next-line import/no-cycle
import hangEventOnSelect from '../events/select.event';


const createSelectOptions = (array, name) => array.map((item, index) => createElement({
  tagName: 'option', classNames: 'level-option', textContent: `${name} ${index + 1}`, attrs: [['value', `${index}`]],
}));

const createLevelsSelect = () => {
  const levelOptions = createSelectOptions([...Array(6).keys()], 'Уровень');
  const roundOptions = createSelectOptions([...Array(30).keys()], 'Раунд');
  const levelSelect = createElement({
    tagName: 'select', classNames: 'select-css', children: levelOptions, onChange: hangEventOnSelect.bind(this, true),
  });
  const roundSelect = createElement({
    tagName: 'select', classNames: 'select-css', children: roundOptions, onChange: hangEventOnSelect.bind(this, false),
  });
  const selectContainer = createElement({
    tagName: 'div', children: [levelSelect, roundSelect], classNames: 'select-container',
  });
  return selectContainer;
};

const createSoundSwitcher = () => {
  const noteImg = createElement({ tagName: 'img', classNames: 'process__note-img', attrs: [['src', note]] });

  const switcher = createElement({ tagName: 'p', classNames: 'process__switcher', textContent: 'on' });
  const noteContainer = createElement({
    tagName: 'div', classNames: 'process__note', children: [noteImg, switcher], onClick: onSound,
  });

  return noteContainer;
};

const createCross = () => {
  const cross = createElement({ tagName: 'img', classNames: 'game-container__dagger-img', attrs: [['src', dagger]] });
  const heartContainer = createElement({ tagName: 'div', classNames: 'game-container__hearts hide', children: heartCreator() });

  const crossContainer = createElement({
    tagName: 'div', classNames: 'game-container__dagger-container', children: [heartContainer, cross], onClick: closeGame,
  });

  return crossContainer;
};

const createHeaderOnStartingPage = () => {
  const noteContainer = createSoundSwitcher();
  const selectContainer = createLevelsSelect();
  const crossContainer = createCross();
  const head = createElement({ tagName: 'div', classNames: 'game-container__head wrapper', children: [noteContainer, selectContainer, crossContainer] });
  document.body.append(head);
};


export default createHeaderOnStartingPage;
