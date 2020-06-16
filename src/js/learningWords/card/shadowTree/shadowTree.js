const cardShadowTreeHTML = `
<style>
  :host {width: 100%; height: 100%; display:flex; flex-direction: column;  }
</style>

<div id='mainBlock'>

  <div id='ENBLock'>
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
