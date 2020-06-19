const cardShadowTreeHTML = `
<style>
  :host {width: 100%; min-width: 500px; min-height: 300px; display:flex; justify-content: center; align-items: center; background-color: white; box-shadow: 0px 0px 15px #cacaca; border-radius: 15px;}
  div {display:flex; justify-content: center;}
  #mainBlock {width: 95%; height: 95%; flex-direction: column;}
  #ENBlock { padding-bottom: 15px; max-height: 50%; position: relative; flex-direction: column; align-items: center ;justify-content: flex-end; font-size: 50px; border-bottom: 1px solid #efe6e1;}
  #ENWord {padding-top: 100px; padding-bottom: 15px;}
  #imgBlock {overflow: hidden; position: absolute; top: -50px;  }
  #imgBlock ::slotted(div) {width: 100px; height: 100px; background-color: black; border:5px solid white; border-radius: 5px;}
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
      <slot name='hardWord'></slot>
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
