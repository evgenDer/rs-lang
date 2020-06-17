const cardShadowTreeHTML = `
<style>
  :host {width: 100%; min-width: 500px; min-height: 300px; display:flex; justify-content: center; align-items: center; background-color: white; box-shadow: 0px 0px 15px #cacaca; border-radius: 15px;}
  div {display:flex; justify-content: center;}
  #mainBlock {width: 95%; height: 95%; flex-direction: column;}
  #ENBlock { padding-bottom: 15px; height: 50%; align-items: flex-end; font-size: 50px; border-bottom: 1px solid #efe6e1;}
  #RUBlock { padding-top: 15px; height: 35%; align-items: flex-start; font-size: 30px;}
  #optionBlock {margin-bottom: 5px; flex-direction: row; justify-content: flex-start;}
  #difficultyButtonsBlock {min-width: 70%;}
  #optionButtonsBlock {min-width: 30%;}
  ::slotted(img) {filter: brightness(0) opacity(40%) ; transition: filter 0.5s; color:red}
  ::slotted(img:hover) { filter: opacity(90%) ; cursor: pointer;}
</style>

<div id='mainBlock'>

  <div id='ENBlock'>
    <slot name='ENitem'></slot>
  </div>

  <div id='RUBlock'>
    <slot name='RUitem'></slot>
  </div>

  <div id='optionBlock'>
    <div id='difficultyButtonsBlock'>
      <slot name='good'></slot>
      <slot name='normal'></slot>
      <slot name='hard'></slot>
    </div>

    <div id='optionButtonsBlock'>
      <slot name='pronunciation'></slot>
      <slot name='keyboard'></slot>
    </div>

    </div>
  </div>

</div>

`;

export default cardShadowTreeHTML;
