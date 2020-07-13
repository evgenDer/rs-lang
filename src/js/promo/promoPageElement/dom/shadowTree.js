import {
  markToStyle,
  markToText,
} from '../../../learningWords/card/domBuilder/lightTree/updateStatus';

const styles = {
  easyButtonColor: '#61bd4f',
  normalButtonColor: '#338c99',
  hardButtonColor: '#fe5c55',
  fontColor: '#0f2c5c',
  colorOrange: '#ff934d',
  colorLightBlue: '#338c99',
  colorBlack: '#333333',
  colorOpacityBlack: '#33333370',
  contentWidth: '1400px',
  tabletWidth: '650px',
  mobileBigWidth: '414px',
  topBarHeight: '83px', //topBar
};

const promoPageShadowTree = `
<style>

  :host{margin: 0px auto 0px; width: 100%; color: #0f2c5c; text-align: center; font-weight: 500;}
  div{ display:flex; justify-content:center; align-items: center; flex-direction: column;}
  #background{width: 100%; height:100vh; position:fixed; z-index:10; voerflow:hidden; object-fit:cover; filter: opacity(0.2)}
  #background img{width: 100%; height:100vh; object-fit:cover; }
  #contentBlock {padding: 0px 40px; width:calc(100% - 80px); position:relative; z-index:11; }
  .header {width: 100%;  max-width: 900px; height: 100px; font-size: 18px;}

  #aboutSlider {flex-wrap: wrap; flex-direction: row;}
  .aboutCard {width:220px; height:150px; flex-direction: row;}
  .cardContent {width: 95%; height:80%; justify-content:flex-start; background: #ffffff70;
     border: 1px solid ${styles.colorOpacityBlack}; border-top:none; border-radius: 10px;}
  #aboutSlider .cardContent:hover {border-bottom: 5px solid ${styles.colorOrange};}
  .cardImg {width: 100%; height: 40px; position: relative; flex-direction: row;}
  .cardImg .deadZone {width: calc((100% - 77px)/2); height: 100%; border-top: 1px solid ${styles.colorOpacityBlack};}
  .cardImg img {width:64px; height:64px; position: relative; top: -10px; object-fit:content;}
  #aboutSlider .cardText {height: calc(100% - 40px);}
  .cardText span {padding: 0px 5px;}

  .content {width: calc(100vw - 80px); max-width: 800px; height:100vw; max-height:500px; }

  #aboutVideo .content {background: #ffffff90;  border: 1px solid ${styles.colorOpacityBlack}; border-radius: 20px;}
  #aboutLearning .content {height: auto; flex-direction: row;}
  #aboutLearningScreen {padding: 10px; width:55%; height: 100%; min-width: 320px; min-height: 340px; position: relative; align-items: flex-start;
    background: #ffffff90;  border: 1px solid ${styles.colorOpacityBlack}; border-radius: 20px; }
  #aboutLearningScreen .screen {z-index:14; filter: opacity(0); text-align: left; transition: filter 0.5s;}
  #aboutLearningScreen .opened {z-index:15; filter: opacity(1);}

  #aboutLearningCanvas {width: calc(100% - 20px); height:calc(100% - 20px); position: absolute;
     background: #f8f2ee99; border-radius: 10px;}
  ::slotted([slot=chart]) {width:calc(100% - 20px); height: calc(100% - 40px);}
  #aboutLearningPoints {width: calc(100% - 20px); height:calc(100% - 20px); position: absolute; align-items: flex-start;
     background: #f8f2ee99; border-radius: 10px;}
  #aboutLearningPoints .statusLine {margin: 10px; padding: 5px; width: 180px;
      align-items: flex-start; border-bottom: 3px solid ${markToStyle['5']}; }
  #aboutLearningPoints .dotStatus {width:100%; flex-direction: row; justify-content: flex-start;}
  #aboutLearningPoints .dot {margin: 5px 5px 5px 0px; width: 10px; height: 10px; border-radius: 5px; background-color: pink;}
  #aboutLearningCalculatingAlgorithm {width: calc(100% - 20px); height:calc(100% - 20px); position: absolute;
     align-items: flex-start; background: #f8f2ee99; border-radius: 10px;}
  #aboutLearningCalculatingAlgorithm > span {padding: 5px 15px;}
  #aboutLearningDetails {width: calc(100% - 20px); height:calc(100% - 20px); position: absolute;
     align-items: flex-start; background: #f8f2ee99; border-radius: 10px;}
  #aboutLearningDetails span {padding:5px 15px;}
  #aboutLearningText {width:45%; height: 100%;}
  #aboutLearningText ::slotted(li){margin-bottom: 10px; transition: color 0.2s;}
  #aboutLearningText ::slotted(li.active){color:${styles.colorLightBlue}}
  #aboutLearningText ::slotted(li:hover) {cursor: pointer; color:${styles.colorLightBlue}}

  #feedbacks .content {margin-bottom: 100px; max-width: 1200px; height: auto; max-height: none;
     flex-direction: row; flex-wrap:wrap; align-items: flex-start;}
  #feedbacks .feedbackCard {width:220px; height:150px; flex-direction: row;}
  #feedbacks .cardContent {border-top:1px solid ${styles.colorOpacityBlack};}
  #feedbacks .cardText {height: calc(100% - 30px);}
  #feedbacks .author {filter: opacity(0.5);}

  footer {width: 100%; height:70px; display:flex; z-index: 11; justify-content: center; background: #ffffff90;
     border-top: 1px solid ${styles.colorOpacityBlack}; border-radius: 10px;}
  footer .content {width: calc(100%-20px); max-width: 1200px; height: 100%; flex-direction:row; justify-content: flex-start;}
  footer span {width:30%; font-size: 25px; text-align: left;}
  #footerInfo {width: 70%;flex-direction:row; justify-content: flex-end;}
  #footerInfo span {width: 100%; font-size:20px; text-align: right; }
  #footerInfo ::slotted(img) {width: 64px; height: 64px; z-index: 12; transform: translateY(0px); transition: transform 0.3s; }
  #footerInfo ::slotted(img:hover) {cursor:pointer; transform: translateY(-3px);}

  @media screen and (max-width: ${styles.contentWidth}){
    #background img{width:1400px;}
  }

  @media screen and (max-width: ${styles.tabletWidth}) {
    #aboutVideo .content {max-height:300px;}
    #aboutLearning .content{max-height: none; flex-direction: column;}
    #aboutLearningScreen {width: 100%;}
    #aboutLearningText {width: 100%; text-align:left;}
  }
  @media screen and (max-width: ${styles.tabletWidth}){
    :host {font-size: 14px;}
    #aboutLearningScreen {min-width:250px;}
    .header {padding: 30px 0px 30px; font-size:16px; height: auto;}
    footer span {font-size:22px;}
    #footerInfo span {display:none;}
  }


</style>

<div id='background'>
  <img src='assets/img/promoBackground.jpg' >
</div>

<div id='contentBlock'>
  <div id='header'>
    <h1>
      <span>RS LANG</span>
      - это эффективный способ изучения Английского языка.</br> Присоединяйся!
    </h1>
  </div>

  <div id='aboutShort'>
    <div class='header'>
      <span>Знания делают мир лучше, поэтому мы с радостью делимся ими бесплатно!</span>
    </div>
    <div id='aboutSlider'>

    <div class='aboutCard'>
      <div class='cardContent'>
        <div class='cardImg'>
          <div class='deadZone'></div>
          <img src='assets/img/icons/promo/chart.png'>
          <div class='deadZone'></div>
        </div>
        <div class='cardText'>
          <span>Оценивай свой прогресс!</span>
        </div>
      </div>
    </div>

    <div class='aboutCard'>
      <div class='cardContent'>
        <div class='cardImg'>
          <div class='deadZone'></div>
          <img src='assets/img/icons/promo/game.png'>
          <div class='deadZone'></div>
        </div>
        <div class='cardText'>
          <span>Играй и запоминай слова!</span>
        </div>
      </div>
    </div>

<div class='aboutCard'>
<div class='cardContent'>
  <div class='cardImg'>
    <div class='deadZone'></div>
    <img src='assets/img/icons/promo/repeat.png'>
    <div class='deadZone'></div>
  </div>
  <div class='cardText'>
    <span>Пополняй словарный запас каждый день!</span>
  </div>
</div>
</div>

<div class='aboutCard'>
<div class='cardContent'>
  <div class='cardImg'>
    <div class='deadZone'></div>
    <img src='assets/img/icons/promo/customize.svg'>
    <div class='deadZone'></div>
  </div>
  <div class='cardText'>
    <span>Кастомизируй карточки для максимального удобства!</span>
  </div>
</div>
</div>

<div class='aboutCard'>
<div class='cardContent'>
<div class='cardImg'>
  <div class='deadZone'></div>
  <img src='assets/img/icons/promo/choose.png'>
  <div class='deadZone'></div>
</div>
<div class='cardText'>
  <span>Отмечай сложные слова и повторяй их чаще!</span>
</div>
</div>
</div>

</div>
</div>

  <div id='aboutVideo'>
    <div class='header'>
      <span>Посмотрите видео и ознакомьтесь с функциональностью приложения!</span>
    </div>
    <div class='content';>
      <slot name='videoElement'></slot>
    </div>
  </div>

  <div id='aboutLearning'>
    <div class='header'>
      <span>Изучайте слова по специальной методике, основывающейся на последних научныx достижениях в области процессов запоминания информации!</span>
    </div>
    <div class='content'>
      <div id='aboutLearningScreen'>

        <div id='aboutLearningPoints' class='screen  opened'>
          <div class='statusLine'>
            <div class='dotStatus'>
              <div class='dot' style='background:${markToStyle['1']}'></div>
            </div>
            <div class='textStatus'><span>${markToText['1']}</span></div>
          </div>
          <div class='statusLine'>
            <div class='dotStatus'>
              <div class='dot' style='background: ${markToStyle['3']}'></div>
              <div class='dot' style='background: ${markToStyle['3']}'></div>
              <div class='dot' style='background: ${markToStyle['3']}'></div>
            </div>
            <div class='textStatus'><span>${markToText['3']}</span></div>
          </div>
          <div class='statusLine'>
            <div class='dotStatus'>
              <div class='dot' style='background: ${markToStyle['5']}'></div>
              <div class='dot' style='background: ${markToStyle['5']}'></div>
              <div class='dot' style='background: ${markToStyle['5']}'></div>
              <div class='dot' style='background: ${markToStyle['5']}'></div>
              <div class='dot' style='background: ${markToStyle['5']}'></div>
            </div>
            <div class='textStatus'><span>${markToText['5']}</span></div>
          </div>
        </div>

        <div id='aboutLearningCalculatingAlgorithm' class='screen'>
          <span>
            Слово Правильное и
            </br><span style='color:${styles.easyButtonColor}'>...легкое: +1</span>
            </br><span style='color:${styles.normalButtonColor}'>...среднее: +0.5</span>
            </br><span style='color:${styles.hardButtonColor}'>...тяжелое: +0.2</span>
          </span>
          </br><span>
          Слово Неправильное и
            </br><span style='color:${styles.easyButtonColor}'>...легкое: -0.2</span>
            </br><span style='color:${styles.normalButtonColor}'>...среднее: -0.5</span>
            </br><span style='color:${styles.hardButtonColor}'>...тяжелое: -1</span>
          </span>
          </br><span>
          Для игр коэфициенты уменьшены в 2 раза
          </span>
        </div>

        <div id='aboutLearningCanvas' class='screen'>
          <slot name='chart'></slot>
        </div>

        <div id='aboutLearningDetails' class='screen'>
          <span>Отвечайте правильно и набирайте <b>до 5 баллов</b> </span>
          </br><span>За первое изучение слова при правильном ответе рейтинг ставноится равным <b style='color:${styles.easyButtonColor}'>3</b>, неправильном - <b style='color:${styles.hardButtonColor}'>1 </b></span>
          </br><span>До 2 баллов очки только <b style='color:${styles.easyButtonColor}'>начисляются</b>, но <b style='color:${styles.hardButtonColor}'>не уменьшаются</b></span>
          </br><span>После достижения 2 баллов появляется <b>несгораемое значение в 2 балла</b></span>
          </br><span>После 4 баллов очки начисляются по длине серии правильных ответов</span>
        </div>


      </div>
      <div id='aboutLearningText'>
        <ul>
          <slot name='property'></slot>
        </ul>
      </div>
    </div>
  </div>

  <div id='feedbacks'>
    <div class='header'>
      <span>Нашим сервисом довольны!</span>
    </div>
    <div class='content'>

      <div class='feedbackCard'>
        <div class='cardContent'>
          <div class='cardText'>
            <span>Awesome!</span>
          </div>
          <div class='author'>
            <span>Alex</span>
          </div>
        </div>
      </div>

      <div class='feedbackCard'>
      <div class='cardContent'>
        <div class='cardText'>
          <span>Узнал то, чего не сказали на lingvoleo!</span>
        </div>
        <div class='author'>
          <span>Василий</span>
        </div>
      </div>
    </div>

    <div class='feedbackCard'>
      <div class='cardContent'>
        <div class='cardText'>
          <span>Очень глубоко продуманное приложение</span>
        </div>
        <div class='author'>
          <span>AnnieBunny</span>
        </div>
      </div>
    </div>

    <div class='feedbackCard'>
    <div class='cardContent'>
      <div class='cardText'>
        <span>Приятное оформление,спасибо за такую красоту!</span>
      </div>
      <div class='author'>
        <span>SomeOne01</span>
      </div>
    </div>
  </div>

  <div class='feedbackCard'>
    <div class='cardContent'>
      <div class='cardText'>
        <span>Всю ночь играла в игры вместо сна, супер!</span>
      </div>
      <div class='author'>
        <span>MMgirl</span>
      </div>
    </div>
  </div>

    </div>
    <slot name='feedbackElement'></slot>
  </div>

</div>

<footer>
  <div class='content'>

    <span>RSSсhool 2020</span>
    <div id='footerInfo'>
      <span>theBestTeamEver</span>
      <slot name='gitHubWay'></slot>
    </div>

    </div>
</footer>


`;
export default promoPageShadowTree;
