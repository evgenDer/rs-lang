const cardShadowTreeHTML = `
<style>
  :host {width: 100%; min-width: 500px; min-height: 300px;  display:flex; justify-content: center; align-items: center;
     background-color: white; box-shadow: 0px 0px 15px #cacaca; border-radius: 15px;}
  div {display:flex; justify-content: center;}
  #mainBlock {width: 95%; height: 95%; position: relative; flex-direction: column;}
  #statusBlock {width: calc(50% - 60px); height: 40px; position: absolute; top:0; left:0; z-index:11;
     flex-direction: column;}
  #statusBlock div {justify-content: flex-start;}
  ::slotted(div.dot) {margin: 5px; width: 10px; height: 10px; border-radius: 5px; background-color: pink;}
  ::slotted([slot=statusText]){filter: opacity(0%); transition: filter; transition-duration:0.6s;}
  ::slotted(div.dot){filter: opacity(40%); transition: filter; transition-duration:0.6s;}
  #statusBlock:hover ::slotted(div.dot),
  #statusBlock:hover ::slotted([slot=statusText]){filter: opacity(90%);}
  #ENBlock { padding-bottom: 15px; max-height: 50%; position: relative; flex-direction: column; align-items: center ;justify-content: flex-end; font-size: 50px; border-bottom: 1px solid #efe6e1;}
  #ENWord {padding-top: 200px; padding-bottom: 15px;}
  #imgBlock {overflow: hidden; position: absolute; top: -50px; border:5px solid white; border-radius: 5px; }
  #imgBlock ::slotted(img) {width: 130px; height: 130px; object-fit: cover;}
  .sentenseBlock {width:100%; font-size:15px;  flex-direction: column; align-items: center;}
  .sentenseBlock ::slotted(span) {padding-bottom: 7px; text-align:center;}
  #RUBlock { padding-top: 15px; height: 35%; flex-direction: column; justify-content: flex-start; align-items: center; font-size: 30px;}
  #RUWord {padding-bottom: 15px;}
  #optionBlock {margin-bottom: 5px; flex-direction: row; justify-content: flex-start;}
  #difficultyButtonsBlock {min-width: 60%;}
  #difficultyButtonsBlock ::slotted(div) {margin:0px 5px 0px; min-width: 50px; filter: opacity(40%); transition: filter 0.5s;}
  #difficultyButtonsBlock ::slotted(div:hover) {cursor: pointer; text-decoration: underline; filter: opacity(100%);}
  #optionButtonsBlock {min-width: 40%;}
  #readItBlock ::slotted(span) {padding-right: 5px; filter: opacity(70%) ; transition: filter 0.5s;}
  #readItBlock ::slotted(img) {filter: brightness(0) opacity(40%) ; transition: filter 0.5s; color:red}
  #readItBlock:hover ::slotted(span),
  #readItBlock:hover ::slotted(img){ filter: opacity(90%) ; cursor: pointer;}
</style>

<div id='mainBlock'>
  <div id='statusBlock'>
    <div id='statusDots'>
      <slot name='statusDot'></slot>
    </div>
    <div id='statusText'>
      <slot name ='statusText'></slot>
    </div>
  </div>

  <div id='ENBlock'>
    <div id='ENWord'>
      <slot name='ENitem'></slot>
    </div>
    <div id='imgBlock'>
      <slot name='cardImg'></slot>
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
