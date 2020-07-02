const dayResultsShadowTreeHTML = `
<style>
  :host {width:100%; height:100%;}
  div {display:flex; flex-direction: column; justify-content: flex-start; align-items:center;}
  #background {width:100%; height:100%; z-index:10; background-color: #050505c7;}

  #contentBlock {margin-top: 100px; width:60%; max-width: 800px; min-width: 500px; min-height: 350px; z-index:11; background-color: white; border-radius: 15px;}
  #header {margin: 0px 10px; width:90%; min-height:20%; font-size:20px; justify-content: center; border-bottom:1px solid #efe6e1}
  #resultsBar {margin: 0px 10px; width:90%; min-height:50%; justify-content:center; font-size:20px; border-bottom:1px solid #efe6e1}
  .resultsLine {width: 100%; flex-direction: row; }
  .resultsLine span {margin-right: 5px;}
  #buttonsBar {margin: 0px 10px; width:90%; min-height: 20%; flex-direction: row; justify-content:center; font-size:20px;}
  ::slotted(.button) {margin: 10px; filter: opacity(40%); transition: filter 0.5s;}
  ::slotted(.button:hover) {cursor: pointer; text-decoration: underline; filter: opacity(100%);}
</style>

<div id='background'>
<div id='contentBlock'>
  <div id='header'>
    <slot name='resultsHeader'></slot>
  </div>

  <div id='resultsBar'>
    <div class='resultsLine'>
      <span>Новые слова: </span>
      <slot name='newWordCount'></slot>
    </div>

    <div class='resultsLine'>
      <span>Изученные слова: </span>
      <slot name='learnedWordCount'></slot>
    </div>

    <div class='resultsLine'>
      <span>Ошибки: </span>
      <slot name='errorCount'></slot>
    </div>

    <div class='resultsLine'>
      <span>Пропущено: </span>
      <slot name='noAnswered'></slot>
    </div>
  </div>

  <div id='buttonsBar'>
    <slot name='buttonLeft'></slot>
    <slot name='buttonRight'></slot>
  </div>
</div>
</div>
`;

export default dayResultsShadowTreeHTML;
