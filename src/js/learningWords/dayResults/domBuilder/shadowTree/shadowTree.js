const styles = {
  tabletWidth: '768px',
  mobileBigWidth: '414px',
};

const dayResultsShadowTreeHTML = `
<style>
  :host {width:100%; height:100%;}
  div {display:flex; flex-direction: column; justify-content: center; align-items:center;}
  #background {width:100%; height:100%; justify-content: flex-start; z-index:10; background-color: #050505c7;}

  #contentBlock {margin-top: 100px; width:60%; max-width: 550px; min-width: 500px; min-height: 350px;
     z-index:11; font-size:20px; background-color: white; border-radius: 15px;}
  #header {margin: 0px 10px; width:90%; min-height:20%; text-align:center;  border-bottom: 1px solid #efe6e1;}
  #resultsBar {margin: 0px 40px; width:90%; min-height:50%; align-items: center; border-bottom:1px solid #efe6e1}
  .resultsLine {margin: 3px; width: 100%; flex-direction: row; justify-content: flex-start; }
  .resultsLine span { width: calc(100% - 50px); display: block;}
  .lineStat {width: 50px; align-items: flex-end;}
  #buttonsBar {margin: 0px 10px; width:90%; min-height: 20%; flex-direction: row;}
  ::slotted(.button) {margin: 10px; text-align:center; filter: opacity(40%); transition: filter 0.5s;}
  ::slotted(.button:hover) {cursor: pointer; text-decoration: underline; filter: opacity(100%);}

  @media screen and (max-width: ${styles.tabletWidth}) {
  #contentBlock {max-width:80%; width:80%; min-width: 300px; font-size: 18px;}
  }

</style>

<div id='background'>
<div id='contentBlock'>
  <div id='header'>
    <slot name='resultsHeader'></slot>
  </div>

  <div id='resultsBar'>
    <div class='resultsLine'>
      <span>Всего слов: </span>
      
      <div class='lineStat'>
      <slot name='learnedWordCount'></slot></div>
    </div>

    <div class='resultsLine'>
      <span>Новые слова: </span>
      <div class='lineStat'>
      <slot name='newWordCount'></slot></div>
    </div>

    <div class='resultsLine'>
      <span>Правильно : </span>
    <div class='lineStat'>
      <slot name='rightAnswers'></slot></div>
    </div>

    <div class='resultsLine'>
      <span>Лучшая серия: </span>
    <div class='lineStat'>
      <slot name='bestSeries'></slot></div>
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
