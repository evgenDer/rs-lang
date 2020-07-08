import { createElementObj } from '../utils/create';
import { SORTING_OPTIONS, CATEGORIES_WORDS, CATEGORIES } from '../constants/vocobularConstants';

export default class ControlBar {
  constructor(isSortAscendingDefault, sortNameDefault, categoryDefault) {
    this.isSortAscending = isSortAscendingDefault;
    this.currentSortName = sortNameDefault;
    this.currentCategory = categoryDefault;
  }

  generate(callback) {
    const categoriesWordsItems = [];
    const categoriesWords = Object.keys(CATEGORIES_WORDS);
    categoriesWords.forEach((category) => {
      const linck = createElementObj({ tagName: 'a', textContent: CATEGORIES_WORDS[category].text, attrs: [['id', category], ['href', '#']] });
      const item = createElementObj({ tagName: 'li', classNames: 'vocabulary__tab-link', children: [linck] });
      if (category === this.currentCategory) {
        item.classList.add('uk-active');
      }
      categoriesWordsItems.push(item);
    });
    this.wordCategorySwitch = createElementObj({
      tagName: 'ul',
      classNames: 'vocabulary__word-category-switch',
      children: categoriesWordsItems,
      attrs: [['uk-tab']]
    });

    const imgRepeatWords = createElementObj({ tagName: 'img', attrs: [['src', './assets/img/icons/learning.svg'], ['alt', 'изучить слова']] });
    this.repetitionWordsBtn = createElementObj({
      tagName: 'button',
      classNames: 'hidden uk-button uk-button-default repetition-words-btn',
      attrs: [['uk-tooltip', 'title: Повторить сложные слова; offset: -0.1']],
      children: [imgRepeatWords],
    });

    const sortingSwitchBtn = createElementObj({
      tagName: 'button',
      classNames: 'uk-button uk-button-default vocabulary__sort-dropdown-btn',
    });
    this.sortingSwicherItems = [];
    const sortingOptionsNames = Object.keys(SORTING_OPTIONS);
    sortingOptionsNames.forEach((sortName) => {
      const item = createElementObj({ tagName: 'li', classNames: 'list_item', textContent: SORTING_OPTIONS[sortName].text, attrs: [['id', sortName]] });
      if (sortName === this.currentSortName) {
        item.classList.add('list-item_active');
      }
      this.sortingSwicherItems.push(item);
    });
    const sortHeader = createElementObj({ tagName: 'li', classNames: 'uk-nav-header list_item_header', textContent: 'Сортировать по:' });
    this.sortingSwitch = createElementObj({
      tagName: 'ul',
      classNames: 'uk-nav uk-dropdown-nav vocabulary__sorting-switcher',
      children: [sortHeader, ...this.sortingSwicherItems],
    });
    const sortingSwitchContainer = createElementObj({
      tagName: 'div',
      classNames: 'sort-dropdown_list-container',
      attrs: [['uk-dropdown', 'animation: uk-animation-slide-top-small; duration: 400; pos: bottom-right']],
      children: [this.sortingSwitch],
    });

    const containerBtns = createElementObj({ tagName: 'div', classNames: 'vocabulary__btns', children: [this.repetitionWordsBtn, sortingSwitchBtn, sortingSwitchContainer] });
    const controlBar = createElementObj({ tagName: 'div', classNames: 'vocabulary__control-bar', children: [this.wordCategorySwitch, containerBtns] });

    this.addListeners(callback);
    return controlBar;
  }

  showRepeatButton() {
    this.repetitionWordsBtn.classList.remove('hidden');
  }

  hideRepeatButton() {
    this.repetitionWordsBtn.classList.add('hidden');
  }

  addListeners(callback) {
    this.sortingSwitch.addEventListener('click', (event) => {
      const currentElement = this.sortingSwicherItems.find((item) => item.contains(event.target));
      if (currentElement) {
        if (currentElement.classList.contains('list-item_active')) {
          currentElement.classList.toggle('list-item_revers');
          this.isSortAscending = !this.isSortAscending;
        } else {
          this.sortingSwicherItems.forEach((item) => item.classList.remove('list-item_active', 'list-item_revers'));
          currentElement.classList.add('list-item_active');
          this.isSortAscending = true;
        }
        this.currentSortName = currentElement.id;
        callback.onClickSorting(this.currentSortName, this.isSortAscending);
      }
    });

    this.wordCategorySwitch.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        this.currentCategory = event.target.id;
        if (this.currentCategory !== CATEGORIES.hard) {
          this.hideRepeatButton();
        }
        callback.onClickCategoryWord(this.currentCategory, this.currentSortName, this.isSortAscending);
      }
    });

    this.repetitionWordsBtn.addEventListener('click', callback.onClickRepetitionWords);
  }
}
