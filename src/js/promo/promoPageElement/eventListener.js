export default function initEventListener(promoPage) {
  const liArr = promoPage.querySelectorAll('li');
  console.log(liArr);
  const aboutLearningScreenElementArr = promoPage.shadowRoot.querySelectorAll(
    '#aboutLearningScreen > div',
  );
  console.log(aboutLearningScreenElementArr);
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
    }
  });
}
