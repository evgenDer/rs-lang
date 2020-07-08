import Determinate   from './Determinate';


const lvlDetreminate = new Determinate();
const btnStart = document.querySelector('.main-card__body_btn-start');


function addBtnStartEventListener () {
  btnStart.addEventListener('click', () =>{
    lvlDetreminate.start();
  });
}

window.onload = () => {

  addBtnStartEventListener();
}
