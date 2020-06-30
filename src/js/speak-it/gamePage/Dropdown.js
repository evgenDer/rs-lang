import { createElement } from '../../utils/create';

export default class Dropdoun {
  constructor(nameItem , amountElements, numCurrentItem) {
    this.nameItem = nameItem ;
    this.amountElements = amountElements;
    this.numCurrentItem =  numCurrentItem;
  }

  generate(callback) {
    this.items = [];
    for (let i = 0; i < this.amountElements; i += 1) {
      const item = createElement({ tagName: 'li', classNames: `list_item`, textContent: `${this.nameItem} ${i + 1}` });
      if( i === this.numCurrentItem) {
        item.classList.add('list-item_active');
      }
      this.items.push(item);
    }
    this.list = createElement({ tagName: 'ul', classNames: 'uk-nav uk-dropdown-nav', children: this.items });
    this.listContainer = createElement({
      tagName: 'div',
      classNames: 'game-control_list-container',
      children: [this.list],
      attrs:[['uk-dropdown', 'animation: uk-animation-slide-top-small; duration: 1000']],
    });
    this.btn = createElement({ tagName: 'button', classNames: 'uk-button uk-button-default game-control__btn', textContent: `${this.nameItem} ${this.numCurrentItem + 1}`});
    const gameControlDropdown= createElement({ tagName: 'div', classNames: 'game-control-dropdown', children: [this.btn, this.listContainer] });
    this.addListeners(callback);
    return gameControlDropdown;
  }

  getNumCurrentItem() {
    return this.numCurrentItem;
  }

  disableСhange() {
    this.listContainer.setAttribute('uk-dropdown','mode: click');
    this.btn.setAttribute('disabled','true');
    this.btn.classList.add('active');
  }

  enableСhange() {
    this.listContainer.setAttribute('uk-dropdown','animation: uk-animation-slide-top-small; duration: 1000; mode: hover');
    this.btn.removeAttribute('disabled');
    this.btn.classList.remove('active');
  }

  makeItemActive(index) {
    this.items[index].click();
  }

  setNumCurrentItem(index) {
    const currentItems = this.items[index];
    this.items.forEach((element)=> element.classList.remove('list-item_active'));
    currentItems.classList.add('list-item_active');
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
