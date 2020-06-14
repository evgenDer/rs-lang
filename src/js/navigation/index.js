const nav = document.querySelector('.navigation');
const navBtn = document.querySelector('.hamburger__line');
const hamburger = document.querySelector('.hamburger');


function closeNavigationMenu() {
  nav.classList.add('navigation_hidden');
  navBtn.classList.remove('hamburger__line_active');
}


function addNavigationClickHandler() {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('navigation_hidden');
    navBtn.classList.toggle('hamburger__line_active');
  });

  document.addEventListener('click', ({ target }) => {
    if (!nav.contains(target) && (!hamburger.contains(target))) {
      closeNavigationMenu();
    }
  });
}


export default addNavigationClickHandler;
