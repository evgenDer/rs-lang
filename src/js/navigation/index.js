const nav = document.querySelector('.navigation');
const navBtn = document.querySelector('.hamburger__line');
const hamburger = document.querySelector('.hamburger');


function addNavigationClickHandler() {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('navigation_hidden');
    navBtn.classList.toggle('hamburger__line_active');
  });
}


export default addNavigationClickHandler;
