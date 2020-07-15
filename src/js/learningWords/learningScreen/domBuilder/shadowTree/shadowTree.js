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
    easyButtonActiveColor: '#61bd4f80',
    normalButtonActiveColor: '#338c9980',
    hardButtonActiveColor: '#ff934d80',
    easyButtonHoverColor: '#61bd4f90',
    normalButtonHoverColor: '#338c9990',
    hardButtonHoverColor: '#ff934d90',
  },
  modeButtons: {
    newWordButtonColor: '#338c9915',
    learningButtonColor: '#ffd04d25',
    repeatingButtonColor: '#c377e020',
    newWordButtonHoverColor: '#43b7c880',
    learningButtonHoverColor: '#ffd04d80',
    repeatingButtonHoverColor: '#c377e080',
    newWordButtonActiveColor: '#43b7c850',
    learningButtonActiveColor: '#ffd04d50',
    repeatingButtonActiveColor: '#c377e040',
  },
  tabletWidth: '768px',
  mobileBigWidth: '414px',
  topBarHeight: '83px', //topBar
};

const learningScreenShadowTreeHTML = `
<style>
  :host {margin: 0px auto 0px; width: 100%; max-width:1400px; height:calc(100vh - ${styles.topBarHeight}); min-height: 600px; max-height:1000px; 
     position: relative; display: flex; flex-direction: column; align-items:center; color:${styles.fontColor}}
  div{display: flex; justify-content: center;}
  
  ::slotted(learning-results) {}

  #loading {align-items: center;}
  ::slotted([slot=loadingIcon]) {margin: 10px;}

  #cardContentBlock {margin: 120px 0px 20px; width: 100%; height:90%; position:relative;
     flex-direction: column; justify-content: flex-start; align-items: center;}
  #mainBlock {width: 100%; max-width: 800px; z-index:10;}
  #cardBlock {width: 100%; height: 100%;}
  .arrow {width: 10%; min-width: 30px; min-height: 100%; align-items: center;}
  ::slotted(img:hover)  {cursor: pointer;}
  #leftArrow {transform: rotate(180deg);}

  #difficultyBlock{height:30px; align-items: center;}
  ::slotted([slot=difficultyButton]) {padding-bottom: 10px; min-width: 80px; min-height:50px; border-radius:10px;
    display:flex; justify-content: center; align-items:flex-end; border: 3px solid; transform: translateY(-30px);
    transition-property: background, box-shadow;
   transition-duration: 0.3s, 0.3s;}
  ::slotted([slot=difficultyButton].readyToMove){transition-property: background, box-shadow,transform;  transition-duration: 0.3s, 0.3s, 0.6s;}
  ::slotted([slot=difficultyButton].opened) {transform: translateY(0px);}
  ::slotted([slot=difficultyButton].easy) {background: ${styles.difficultyButtons.easyButtonColor}; border-color: ${styles.difficultyButtons.easyButtonColor};}
  ::slotted([slot=difficultyButton].normal) {background: ${styles.difficultyButtons.normalButtonColor}; border-color: ${styles.difficultyButtons.normalButtonColor};}
  ::slotted([slot=difficultyButton].hard) {background: ${styles.difficultyButtons.hardButtonColor}; border-color: ${styles.difficultyButtons.hardButtonColor};}
  ::slotted([slot=difficultyButton].active.easy) {background: ${styles.difficultyButtons.easyButtonActiveColor}; }
  ::slotted([slot=difficultyButton].active.normal) {background: ${styles.difficultyButtons.normalButtonActiveColor}; }
  ::slotted([slot=difficultyButton].active.hard) {background: ${styles.difficultyButtons.hardButtonActiveColor}; }
  ::slotted([slot=difficultyButton].opened:hover) {cursor:pointer; box-shadow: 0px 0px 15px #cacaca;}
  ::slotted([slot=difficultyButton].opened.easy:hover) {background: ${styles.difficultyButtons.easyButtonHoverColor};}
  ::slotted([slot=difficultyButton].opened.normal:hover) {background: ${styles.difficultyButtons.normalButtonHoverColor};}
  ::slotted([slot=difficultyButton].opened.hard:hover) {background: ${styles.difficultyButtons.hardButtonHoverColor};}

  #modeBlock {max-width: 600px; height: 40px; position: absolute; top:-5px; left: 100px;
     flex-direction: row; transition: left 0.4s;}
  ::slotted(div.modeButton) {width:100px; height: 100%; display:flex; justify-content: center; align-items: center;
  font-size: 12px;text-align:center; border: 3px solid; border-radius:10px;
  transform: translateY(-28px); transition-property:transform; transition-duration: 0.5s;}
  #modeBlock ::slotted(div.opened){transform: translateY(0px)}
  ::slotted(div.newWord[slot=modeButton]){background-color:${styles.modeButtons.newWordButtonColor};
   border-color:${styles.modeButtons.newWordButtonColor}; }
  ::slotted(div.learning[slot=modeButton]) {background-color:${styles.modeButtons.learningButtonColor};
   border-color:${styles.modeButtons.learningButtonColor}; }
   ::slotted(div.repeating[slot=modeButton]) {background-color:${styles.modeButtons.repeatingButtonColor};
   border-color:${styles.modeButtons.repeatingButtonColor}; }
  #modeBlock ::slotted(div.opened:hover) { box-shadow: 0px 0px 15px #cacaca;}
  ::slotted(div.newWord.opened[slot=modeButton]:hover) {cursor: pointer; background-color:${styles.modeButtons.newWordButtonHoverColor};}
  ::slotted(div.learning.opened[slot=modeButton]:hover) {cursor: pointer; background-color:${styles.modeButtons.learningButtonHoverColor};}
  ::slotted(div.repeating.opened[slot=modeButton]:hover) {background-color:${styles.modeButtons.repeatingButtonHoverColor};}
  ::slotted(div.active) {box-shadow: 0px 0px 15px #cacaca;}
  ::slotted(div.newWord[slot=modeButton].active) { background-color:${styles.modeButtons.newWordButtonActiveColor};}
  ::slotted(div.learning[slot=modeButton].active) {background-color:${styles.modeButtons.learningButtonActiveColor};}
  ::slotted(div.repeating[slot=modeButton].active) {background-color:${styles.modeButtons.repeatingButtonActiveColor};}
  
  #statusBlock {margin-bottom: 30px;width: 100%; min-width: 300px; max-width: 720px; height: 40px;}
  #statusBarDeadZone {width: 60px; height: 40px;}
  #lineStatusBlock {width:100%; min-width: 160px; max-width: 500px; position: relative;}
  #lineStatus {margin: 15px; width: 100%; height: 10px; border:3px solid #338c9965; border-radius:10px;}
  ::slotted([slot=progressLine]) {margin: 18px; max-width: 464px; height:10px; position: absolute; left:0;
     background: #338c9935; border-radius:10px;
    transition:width; transition-duration:1s;}
  ::slotted(.withoutAnimation[slot=progressLine]){transition:none;}
  #numberStatusBlock {width:60px; height: 40px; align-items: center;}
  ::slotted([slot=numberStatus]) {margin-top: 3px;}
  .deadZone {width: 10%; min-width: 30px; height: 40px;}

  @media screen and (max-width: ${styles.tabletWidth}) {
    :host{ height: auto;}
    #modeBlock{left: calc(50vw - 150px);}
  
  @media screen and (max-width: ${styles.mobileBigWidth}) {
    #mainBlock{ max-width: 250px;}
    
  }


  </style>

  <slot name='results'></slot>

<div id='cardContentBlock'>

<div id='loading'>
    <slot name='loadingIcon'></slot>
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

<div id='difficultyBlock'>
  <slot name='difficultyButton'></slot>
</div>

</div>

<div id='modeBlock'>
  <slot name='modeButton'></slot>
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
