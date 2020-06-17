const arrow = `<svg width="14px" height="35px" viewBox="0 0 14 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="Master-items-DT" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
<g id="•-Master-Links/Next-or-previous-card-cosmos" transform="translate(-16.000000, -5.000000)" fill-rule="nonzero" fill="#5B7195">
<g id="Arrow-next" transform="translate(23.000000, 22.500000) rotate(90.000000) translate(-23.000000, -22.500000) translate(5.500000, 15.000000)">
<path d="M11.1503596,5.52915704 C10.2834241,6.63645852 10.2830028,8.3630033 11.1503596,9.47084296 L23.0702747,24.695666 C23.333278,25.0315894 23.8310204,25.0998567 24.1820134,24.8481452 C24.5330065,24.5964338 24.6043363,24.1200616 24.341333,23.7841382 L12.421418,8.55931519 C11.9771384,7.991855 11.9773786,7.00783828 12.421418,6.44068481 L24.341333,-8.78413819 C24.6043363,-9.12006161 24.5330065,-9.5964338 24.1820134,-9.84814524 C23.8310204,-10.0998567 23.333278,-10.0315894 23.0702747,-9.69566596 L11.1503596,5.52915704 Z" id="Arrow-Back" transform="translate(17.500000, 7.500000) rotate(90.000000) translate(-17.500000, -7.500000) "></path></g></g></g></svg>`

const styles = {
  fontColor: `#0f2c5c`,
  dots: {
    mainColor: `#ffffff`,
    newDots: `#338c9933`,
    newDotsActive: `#338c99`,
    learningDotsSuccess: `#61bd4f`,
    learningDotsError: `#fce373`,
  },
}

const learningScreenShadowTreeHTML = `
<style>
  :host {margin-top: 50px; width: 100vw; display: flex; flex-direction: column; align-items: center; color:${styles.fontColor}}
  div{display: flex; justify-content: center;}
  #topBlock {width: 100%; min-width: 300px; max-width: 600px; height: 40px;}
  .deadZone {width: 10%; min-width: 30px; height: 40px;}
  #statusBar {width: 100%; height: 40px; align-items: center;}
  ::slotted(div.dot) {margin: 5px; width: 10px; height: 10px; border-radius: 5px; background-color:${styles.dots.mainColor};}
  ::slotted(div.newWordDot) {background-color: ${styles.dots.newDots};}
  ::slotted(div.learningWordDot) {}
  ::slotted(div.newWordDot.active) {background-color:${styles.dots.newDotsActive};}
  ::slotted(div.learningWordDot.success) {background-color: ${styles.dots.learningDotsSuccess}}
  ::slotted(div.learningWordDot.error) {background-color: ${styles.dots.learningDotsError}}
  #mainBlock {width: 100%; min-width: 300px; max-width: 600px; max-height: 300px; }
  #cardBlock {width: 100%; height: 100%;}
  .arrow {width: 10%; min-width: 30px; min-height: 100%; align-items: center;}
  ::slotted(svg:hover)  {cursor: pointer;}
  #leftArrow {transform: rotate(180deg);}
</style>

<div id='topBlock'>
  <div class='deadZone'></div>
  <div id='statusBar'>
    <slot name='statusPoint'></slot>
  </div>
  <div class='deadZone'></div>
</div>

<div id='mainBlock'>
  <div id='leftArrow' class='arrow'>
    <slot name='leftArrow'></slot>
  </div>

  <div id='cardBlock'>
    <slot name='card'></slot>
  </div>

  <div id='RightArrow' class='arrow'>
    <slot name='rightArrow'></slot>
  </div>

</div>

`;
export default learningScreenShadowTreeHTML;
