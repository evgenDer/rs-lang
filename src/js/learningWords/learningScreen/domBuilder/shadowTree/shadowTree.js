const styles = {
  fontColor: `#0f2c5c`,
  dots: {
    mainColor: `#ffffff`,
    newDots: `#338c9933`,
    newDotsActive: `#338c99`,
    learningDotsSuccess: `#61bd4f`,
    learningDotsError: `#fce373`,
    noAnswered: `#cecece`,
    deleted: `#fe5c55`,
    hard: `#c377e0`,
  },
  leftButtonColor: `#338c9950`,
  rightButtonColor: `#ff934d50`,
  leftButtonHoverColor: `#43b7c880`,
  rightButtonHoverColor: `#ffd04d80`,
  leftButtonActiveColor: `#43b7c8`,
  rightButtonActiveColor: `#ffd04d`,
}

const learningScreenShadowTreeHTML = `
<style>
  :host {width: 100vw; display: flex; color:${styles.fontColor}}
  div{display: flex; justify-content: center;}
  ::slotted(learning-results) {position: fixed; z-index:10;}
  #cardContentBlock {margin-top: 20px; width: 100%; flex-direction: column; align-items: center;}
  #topBlock {width: 100%; min-width: 300px; max-width: 600px; height: 40px;}
  .deadZone {width: 10%; min-width: 30px; height: 40px;}
  .statusBar {width: calc(50% - 60px); height: 40px; align-items: center;}
  #statusBarDeadZone {width: 120px; height: 40px;}
  ::slotted(div.dot) {margin: 5px; width: 10px; height: 10px; border-radius: 5px; background-color:${styles.dots.mainColor};}
  ::slotted(div.newWordDot) {background-color: ${styles.dots.newDots};}
  ::slotted(div.learningWordDot) {}
  ::slotted(div.newWordDot.active) {background-color:${styles.dots.newDotsActive};}
  ::slotted(div.learningWordDot.hard) {background-color: ${styles.dots.hard}}
  ::slotted(div.learningWordDot.error) {background-color: ${styles.dots.learningDotsError}}
  ::slotted(div.learningWordDot.success) {background-color: ${styles.dots.learningDotsSuccess}}
  ::slotted(div.learningWordDot.noAnswered) {background-color: ${styles.dots.noAnswered}}
  ::slotted(div.learningWordDot.deleted) {background-color: ${styles.dots.deleted}}
  #mainBlock {width: 100%; min-width: 300px; max-width: 600px;}
  #cardBlock {width: 100%; height: 100%;}
  .arrow {width: 10%; min-width: 30px; min-height: 100%; align-items: center;}
  ::slotted(img:hover)  {cursor: pointer;}
  #leftArrow {transform: rotate(180deg);}
  #modeBlock {width: 100%; min-width: 300px; max-width: 600px; height: 40px; flex-direction: row;}
  ::slotted(div.modeButton) {width:100px; height: 100%; display:flex; justify-content: center; align-items: center;}
  ::slotted(div[slot=modeButtonLeft]) {background-color:${styles.leftButtonColor}}
  ::slotted(div[slot=modeButtonRight]) {background-color:${styles.rightButtonColor}}
  ::slotted(div[slot=modeButtonLeft]:hover) {cursor: pointer; background-color:${styles.leftButtonHoverColor}}
  ::slotted(div[slot=modeButtonRight]:hover) {cursor: pointer; background-color:${styles.rightButtonHoverColor}}
  ::slotted(div[slot=modeButtonLeft].active) { background-color:${styles.leftButtonActiveColor}; border: 1px solid ${styles.dots.newDots};}
  ::slotted(div[slot=modeButtonRight].active) {background-color:${styles.rightButtonActiveColor}}
</style>

  <slot name='results'></slot>

<div id='cardContentBlock'>
<div id='topBlock'>
  <div class='deadZone'></div>
  <div id='newWordStatusBar' class='statusBar'>
    <slot name='newWordStatusPoint'></slot>
  </div>
  <div id='statusBarDeadZone'></div>
  <div id='learningStatusBar' class='statusBar'>
    <slot name='learningStatusPoint'></slot>
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

<div id='modeBlock'>
  <div class='deadZone'></div>
  <slot name='modeButtonLeft'></slot>
  <slot name='modeButtonRight'></slot>
  <div class='deadZone'></div>
</div>
</div>
`;
export default learningScreenShadowTreeHTML;
