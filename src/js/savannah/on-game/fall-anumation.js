/* eslint-disable no-param-reassign */
const changeAnimation = (x, y, box) => {
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
  box.classList.remove('animation-down');
};

export default changeAnimation;
