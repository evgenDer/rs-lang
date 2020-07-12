import { createElementObj } from '../../utils/create';

export default class Dropdoun {
  constructor(nameItem , amountElements) {
    this.nameItem = nameItem ;
    this.amountElements = amountElements;
  }

  generate(callback) {
    this.items = [];
    for (let i = 0; i < this.amountElements; i += 1) {
      const item = createElementObj({ tagName: 'li', classNames: `speakit_list-item`, textContent: `${this.nameItem} ${i + 1}` });
      this.items.push(item);
    }
    this.list = createElementObj({ tagName: 'ul', classNames: 'uk-nav uk-dropdown-nav', children: this.items });
    this.listContainer = createElementObj({
      tagName: 'div',
      classNames: 'game-control_list-container',
      children: [this.list],
      attrs:[['uk-dropdown', 'animation: uk-animation-slide-top-small; duration: 1000']],
    });
    this.btn = createElementObj({ tagName: 'button', classNames: 'uk-button uk-button-default speakit_game-control__btn', textContent: `${this.nameItem} ${this.numCurrentItem + 1}`});
    this.gameControlDropdown = createElementObj({ tagName: 'div', classNames: 'game-control-dropdown hidden', children: [this.btn, this.listContainer] });
    this.addListeners(callback);
    return this.gameControlDropdown;
  }

  show() {
    this.gameControlDropdown.classList.remove('hidden');
  }

  hide() {
    this.gameControlDropdown.classList.add('hidden');
  }

  getNumCurrentItem() {
    return this.numCurrentItem;
  }

  disableСhange() {
    this.listContainer.setAttribute('uk-dropdown','mode: click');
    this.btn.setAttribute('disabled','true');
    this.btn.classList.add('disabled');
  }

  enableСhange() {
    this.listContainer.setAttribute('uk-dropdown','animation: uk-animation-slide-top-small; duration: 1000; mode: hover');
    this.btn.removeAttribute('disabled');
    this.btn.classList.remove('disabled');
  }

  makeItemActive(index) {
    this.items[index].click();
  }

  setNumCurrentItem(index) {
    const currentItems = this.items[index];
    this.items.forEach((element)=> element.classList.remove('speakit_list-item_active'));
    currentItems.classList.add('speakit_list-item_active');
    this.numCurrentItem = index;
    this.btn.textContent = currentItems.textContent;
  }

  addListeners(callback) {
    this.list.addEventListener('click', (event) => {
      const index = this.items.findIndex((element) => element === event.target);
      if(index >= 0) {
        this.setNumCurrentItem(index);
        callback();
      }
    });
  }
}
