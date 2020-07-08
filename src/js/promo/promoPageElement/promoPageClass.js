import promoPageShadowTree from './dom/shadowTree';
import updateCanvas from './dom/updateCanvas';
import initEventListener from './eventListener';

export default class PromoPage extends HTMLElement {
  constructor() {
    super();
    this.localState = {
      animationTiming: 10,
    };
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = promoPageShadowTree;
    this.initLightDom();
    updateCanvas(this);
    initEventListener(this);
  }

  initLightDom() {
    this.insertAdjacentHTML(
      'beforeend',
      `<li slot='property' class='active'>Каждое слово имеет свой статус изучения</li>
      <li slot='property'>Отвечай правильно и увеличивай баллы прогресса</li>
      <li slot='property'>Прогресс изучения определяет интервал повторения</li>
      <li slot='property'>Подробнее об алгоритме начисления баллов</li>
      <div slot='chart'><canvas></canvas></div>
    `,
    );
  }
}
