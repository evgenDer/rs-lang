const learningScreenShadowTreeHTML = `
<style>

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

  </div>

  <div id='cardBlock'>
    <slot name='card'></slot>
  </div>

  <div id='RightArrow' class='arrow'>

  </div>

</div>

`;
export default learningScreenShadowTreeHTML;
