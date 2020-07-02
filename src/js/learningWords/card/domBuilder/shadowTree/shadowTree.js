const styles = {
  tabletWidth: '768px',
  mobileBigWidth: '414px',
};

const cardShadowTreeHTML = `
<style>
  :host {width: 100%; min-width: 250px; min-height: 300px; display:flex; justify-content: center; align-items: center;
     background-color: white; box-shadow: 0px 0px 15px #cacaca; border-radius: 15px;}
  div {display:flex; justify-content: center;}
 
  #mainBlock {width: 95%; height: 95%; position: relative;  flex-direction: column;}
  
  #cardTopPanel {width:100%; position: relative; top: -50px; }

  #statusBlock {width: calc(50% - 70px); height: 60px; position:relative; top: 55px; flex-direction: column;}
  #statusBlock div {justify-content: flex-start;}
  ::slotted(div.dot) {margin: 5px; width: 10px; height: 10px; border-radius: 5px; background-color: pink;
    filter: opacity(40%); transition: filter; transition-duration:0.6s;}
  ::slotted([slot=statusText]){ height: 30px; filter: opacity(0%); transition: filter; transition-duration:0.6s;}
  #statusBlock:hover ::slotted(div.dot),
  #statusBlock:hover ::slotted([slot=statusText]){filter: opacity(90%);}
  
  #imgBlock {width: 140px; min-height: 100px; overflow: hidden;}
  #imgBlock ::slotted(div) {width: 140px; height: 140px;
    display:flex; justify-content: center; align-items: center;
    border: 5px solid white; border-radius: 5px;}
  #imgBlock ::slotted(img) {}

  #audioHelperBlock {width: calc(50% - 70px); height: 40px; position:relative; top: 55px; justify-content: flex-end;}
  ::slotted([slot=audioHelperButton]){filter: opacity(0); transition:filter 0.4s;}
  ::slotted(.opened[slot=audioHelperButton]){filter: opacity(0.15); }
  ::slotted(.opened[slot=audioHelperButton]:hover){cursor: pointer; filter: opacity(0.65)}

  #ENBlock { padding-bottom: 15px;  position: relative; top: -35px;
     flex-direction: column; align-items: center ;justify-content: flex-end;
      font-size: 50px; border-bottom: 1px solid #efe6e1;}
  #ENWord {padding-bottom: 15px;}
  
  .sentenseBlock {width:100%; font-size:15px;  flex-direction: column; align-items: center;}
  .sentenseBlock ::slotted(span) {padding-bottom: 7px; text-align:center;}
  
  #RUBlock { padding-top: 15px; position: relative; top: -35px;
     flex-direction: column; justify-content: flex-start; align-items: center; font-size: 30px;}
  #RUWord {padding-bottom: 15px;}
  
  #optionBlock {margin-bottom: 5px; position: relative; top: -20px; 
    flex-direction: row; justify-content: flex-start;}
  #difficultyButtonsBlock {min-width: 70%;}
  #difficultyButtonsBlock ::slotted(div) {margin:0px 10px 0px; min-width: 50px; filter: opacity(80%); transition: filter 0.5s; color:#fe5c55}
  #difficultyButtonsBlock ::slotted(div.hovered) {color: inherit; filter: opacity(40%);}
  #difficultyButtonsBlock ::slotted(div.hovered:hover) {cursor: pointer; text-decoration: underline; filter: opacity(100%);}
  #optionButtonsBlock {min-width: 30%;}
  
  #readItBlock ::slotted(span) {padding-right: 5px; filter: opacity(70%) ; transition: filter 0.5s;}
  #readItBlock ::slotted(img) {filter: brightness(0) opacity(40%) ; transition: filter 0.5s; color:red}
  #readItBlock:hover ::slotted(span),
  #readItBlock:hover ::slotted(img){ filter: opacity(90%) ; cursor: pointer;}
  
  @media screen and (max-width: ${styles.tabletWidth}) {
    #optionBlock {flex-direction: column-reverse;}
    #readItBlock {margin-bottom: 10px;}
  }

  @media screen and (max-width: ${styles.mobileBigWidth}) {
    #statusBlock div {flex-wrap: wrap;}
    #statusText{display: none;}
    #audioHelperBlock {flex-direction: column-reverse; align-items: flex-end;}
    .sentenseBlock {font-size: 13px;}
  }
  </style>

<div id='mainBlock'>

  <div id='cardTopPanel'>
    <div id='statusBlock'>
    <div id='statusDots'>
      <slot name='statusDot'></slot>
    </div>
    <div id='statusText'>
      <slot name ='statusText'></slot>
    </div>
  </div>
 
  <div id='imgBlock'>
  <slot name='cardImg'></slot>
</div>

  <div id='audioHelperBlock'>
    <slot name='audioHelperButton'></slot>
  </div>
  </div>
  
  <div id='ENBlock'>
    
    <div id='ENWord'>
      <slot name='ENitem'></slot>
    </div>
    <div id='ENsentenseBlock' class='sentenseBlock'>
      <slot name='ENExample'></slot>
      <slot name='ENMeaning'></slot>
    </div>
  </div>

  <div id='RUBlock'>
    <div id='RUWord'>
      <slot name='RUitem'></slot>
    </div>
    <div id='RUsentenseBlock' class='sentenseBlock'>
      <slot name='RUExample'></slot>
      <slot name='RUMeaning'></slot>
      </div>
  </div>

  <div id='optionBlock'>
    <div id='difficultyButtonsBlock'>
      <slot name='openWord'></slot>
      <slot name='deleteWord'></slot>
      <slot name='repeatWord'></slot>
      <slot name='restoreWord'></slot>
    </div>

    <div id='optionButtonsBlock'>
    <div id='readItBlock'>
      <slot name='transcription'></slot>
      <slot name='pronunciation'></slot>
    </div>
      <slot name='keyboard'></slot>
    </div>
    </div>
  </div>

</div>

`;

export default cardShadowTreeHTML;
