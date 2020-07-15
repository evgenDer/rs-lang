const playHtml = `<div class = "play__source">
<div class = "game-sprint__play_mark">
  <button class = 'btn_exit btn_close'><img src="./assets/img/icons/arrow-right.svg"></button>
  <button class = "game-container_audio"><img src="assets/img/icons/sound-on.svg"></button>
  <p>0</p>
  <div class = "play__time"></div>
</div>
</div>
<div class="uk-card uk-card-default uk-width-1-3@m card">
  <div class="uk-card-header card__header">
    <button class = "btn_audioexample" uk-tooltip="title: Послушать пример произношения предложения со словом; pos: bottom;"><img src = "assets/img/icons/headphones.svg"></button>
    <div class="card__answers">
      <div class = "circle_sprint"><img src="assets/img/icons/correct.svg" class = "hidden"></div>
      <div class = "circle_sprint"><img src="assets/img/icons/correct.svg" class = "hidden"></div>
      <div class = "circle_sprint"><img src="assets/img/icons/correct.svg" class = "hidden"></div>
    </div>
    <div class="card__result">
      <p></p>
    </div>
  </div>
  <div class="uk-card-body card__body">
    <div class = "body__images">
      <img src="assets/img/icons/sun.svg" class="hidden" alt="sun">
      <img src="assets/img/icons/bird.svg" class= "" alt="bird">
      <img src="assets/img/icons/mountain.svg" class = "hidden" alt="mountain">
      <img src="assets/img/icons/spruce.svg" class="hidden" alt="spruce">
    </div>
    <div class="body__words">
      <p class="word_learn"></p>
      <p class="word_translate"></p>
    </div>
  </div>
  <div class="uk-card-footer">
      <hr>
      <div class="card__btns">
        <button class = "btn_wrong">Неверно</button>
        <button class = "btn_correct">Верно</button>
      </div>
      <div class="card__icons">
        <img src="assets/img/icons/left.svg">
        <img src="assets/img/icons/right.svg">
        <button uk-tooltip="title: Послушать произношение слова; pos: bottom;" class ="btn_pronoucing"></button>
      </div>
  </div>
</div>`;

export default playHtml;
