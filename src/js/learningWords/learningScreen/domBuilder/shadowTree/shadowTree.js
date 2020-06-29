const styles = {
  fontColor: '#0f2c5c',
  dots: {
    mainColor: '#ffffff',
    newDots: '#338c9933',
    newDotsActive: '#338c99',
    learningDotsSuccess: '#61bd4f',
    learningDotsError: '#fce373',
    noAnswered: '#cecece',
    deleted: '#fe5c55',
    hard: '#c377e0',
  },
  difficultyButtons: {
    easyButtonColor: '#61bd4f20',
    normalButtonColor: '#338c9920',
    hardButtonColor: '#ff934d20',
    easyButtonHoverColor: '#61bd4f60',
    normalButtonHoverColor: '#338c9960',
    hardButtonHoverColor: '#ff934d60',
  },
  modeButtons: {
    leftButtonColor: '#338c9920',
    rightButtonColor: '#ff934d20',
    leftButtonHoverColor: '#43b7c850',
    rightButtonHoverColor: '#ffd04d50',
    leftButtonActiveColor: '#43b7c870',
    rightButtonActiveColor: '#ffd04d70',
  },

  topBarHeight: '127px', //topBar + margin
};

const learningScreenShadowTreeHTML = `
<style>
  :host {margin: 50px auto 0px; width: 100%; max-width: 1400px; height:calc(100vh - ${styles.topBarHeight});
     position: relative; display: flex; flex-direction: column; align-items:center; color:${styles.fontColor}}
  div{display: flex; justify-content: center;}
  ::slotted(learning-results) {position: fixed; z-index:10;}

  #cardContentBlock {margin-top: 20px; width: 100%; height:90%; position:relative;
     flex-direction: column; justify-content: flex-start; align-items: center;}
  #mainBlock {width: 100%; min-width: 300px; max-width: 600px; z-index:10;}
  #cardBlock {width: 100%; height: 100%;}
  .arrow {width: 10%; min-width: 30px; min-height: 100%; align-items: center;}
  ::slotted(img:hover)  {cursor: pointer;}
  #leftArrow {transform: rotate(180deg);}

  #difficultyBlock{height:30px; align-items: center;}
  ::slotted([slot=difficultyButton]) {padding-bottom: 10px; min-width:100px; min-height:50px; border-radius:10px;
    display:flex; justify-content: center; align-items:flex-end; border: 3px solid; transform: translateY(-30px);
    transition-property: background, box-shadow;
   transition-duration: 0.3s, 0.3s;}
  ::slotted([slot=difficultyButton].readyToMove){transition-property: background, box-shadow,transform;  transition-duration: 0.3s, 0.3s, 0.6s;}
  ::slotted([slot=difficultyButton].active) {transform: translateY(0px);}
  ::slotted([slot=difficultyButton].easy) {background: ${styles.difficultyButtons.easyButtonColor}; border-color: ${styles.difficultyButtons.easyButtonColor};}
  ::slotted([slot=difficultyButton].normal) {background: ${styles.difficultyButtons.normalButtonColor}; border-color: ${styles.difficultyButtons.normalButtonColor};}
  ::slotted([slot=difficultyButton].hard) {background: ${styles.difficultyButtons.hardButtonColor}; border-color: ${styles.difficultyButtons.hardButtonColor};}
  ::slotted([slot=difficultyButton].active:hover) {cursor:pointer; box-shadow: 0px 0px 15px #cacaca;}
  ::slotted([slot=difficultyButton].active.easy:hover) {background: ${styles.difficultyButtons.easyButtonHoverColor};}
  ::slotted([slot=difficultyButton].active.normal:hover) {background: ${styles.difficultyButtons.normalButtonHoverColor};}
  ::slotted([slot=difficultyButton].active.hard:hover) {background: ${styles.difficultyButtons.hardButtonHoverColor};}

  #modeBlock {max-width: 600px; height: 40px; position: absolute; top:-55px; right:0; flex-direction: row;}
  ::slotted(div.modeButton) {width:100px; height: 100%; display:flex; justify-content: center; align-items: center;
  border: 3px solid; border-radius:10px;}
  ::slotted(div[slot=modeButtonLeft]) {background-color:${styles.modeButtons.leftButtonColor}; border-color:${styles.modeButtons.leftButtonColor}; }
  ::slotted(div[slot=modeButtonRight]) {background-color:${styles.modeButtons.rightButtonColor}; border-color:${styles.modeButtons.rightButtonColor}; }
  #modeBlock ::slotted(div:hover) {cursor: pointer; box-shadow: 0px 0px 15px #cacaca;}
  ::slotted(div[slot=modeButtonLeft]:hover) { background-color:${styles.modeButtons.leftButtonHoverColor};}
  ::slotted(div[slot=modeButtonRight]:hover) { background-color:${styles.modeButtons.rightButtonHoverColor};}
  ::slotted(div.active) {box-shadow: 0px 0px 15px #cacaca;}
  ::slotted(div[slot=modeButtonLeft].active) { background-color:${styles.modeButtons.leftButtonActiveColor};}
  ::slotted(div[slot=modeButtonRight].active) {background-color:${styles.modeButtons.rightButtonActiveColor};}

  #statusBlock {width: 100%; min-width: 300px; max-width: 720px; height: 40px;}
  #statusBarDeadZone {width: 60px; height: 40px;}
  #lineStatusBlock {width:100%; min-width: 160px; max-width: 500px; position: relative;}
  #lineStatus {margin: 15px; width: 100%; height: 10px; border:3px solid pink; border-radius:10px;}
  ::slotted([slot=progressLine]) {margin: 18px; max-width: 470px; height:10px; position: absolute; left:0;
     background: pink; border-radius:10px;
    transition:width; transition-duration:1s;}
  #numberStatusBlock {width:60px; height: 40px; align-items: center;}
  ::slotted([slot=numberStatus]) {margin-top: 3px;}
  .deadZone {width: 10%; min-width: 30px; height: 40px;}
  </style>

  <slot name='results'></slot>

<div id='cardContentBlock'>

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

<div id='difficultyBlock'>
  <slot name='difficultyButton'></slot>
</div>

</div>

<div id='modeBlock'>
  <slot name='modeButtonLeft'></slot>
  <slot name='modeButtonRight'></slot>
</div>

<div id='statusBlock'>
  <div id='statusBarDeadZone' class='deadZone'></div>
  <div id='lineStatusBlock'>
    <div id='lineStatus'></div>
    <slot name='progressLine'></slot>

  </div>
  <div id='numberStatusBlock'>
    <slot name='numberStatus'></slot>
  </div>
</div>


`;
export default learningScreenShadowTreeHTML;
