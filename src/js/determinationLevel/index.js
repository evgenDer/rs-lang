import Determinate from './Determinate';


const lvlDetreminate = new Determinate();
const btnStart = document.querySelector('.main-card__body_btn-start');


export default function addBtnStartEventListener () {
  btnStart.addEventListener('click', () =>{
    lvlDetreminate.start();
  });
}


