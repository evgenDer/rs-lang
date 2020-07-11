import updateCanvas from './dom/updateCanvas';

export default function initEventListener(promoPage) {
  const liArr = promoPage.querySelectorAll('li');
  const aboutLearningScreenElementArr = promoPage.shadowRoot.querySelectorAll(
    '#aboutLearningScreen > div',
  );
  promoPage.addEventListener('click', () => {
    if (event.target.closest('li') != null) {
      const target = event.target.closest('li');
      liArr.forEach((element, index) => {
        element.classList.remove('active');
        aboutLearningScreenElementArr[index].classList.remove('opened');
        if (element === target) {
          aboutLearningScreenElementArr[index].classList.add('opened');
          element.classList.add('active');
        }
      });
    } else if (event.target.closest('img[slot=gitHubWay]') != null) {
      window.location.href = 'https://github.com/evgenDer/rs-lang';
    }
  });

  window.addEventListener('resize', () => {
    updateCanvas(promoPage);
  });
}
