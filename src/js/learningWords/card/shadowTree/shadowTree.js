const cardShadowTreeHTML = `
<style>
  :host {width: 100%; height: 100%; min-width: 500px; min-height: 300px; display:flex; justify-content: center; align-items: center; background-color: white; box-shadow: 0px 0px 15px #cacaca; border-radius: 15px;}
  div {display:flex; justify-content: center;}
  #mainBlock {width: 95%; height: 95%; flex-direction: column;}
  #ENBlock { padding-bottom: 15px; min-height: 50%; align-items: flex-end; font-size: 50px; border-bottom: 1px solid #efe6e1;}
  #RUBlock { padding-top: 15px; min-height: 50%; align-items: flex-start; font-size: 30px;}
</style>

<div id='mainBlock'>

  <div id='ENBlock'>
    <slot name='ENitem'></slot>
  </div>

  <div id='RUBlock'>
    <slot name='RUitem'></slot>
  </div>

  <div id='optionBLock'>
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

`;

export default cardShadowTreeHTML;
