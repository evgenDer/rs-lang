const goToCrystal = (crystal, box) => {
  const {
    y, height,
  } = crystal.getBoundingClientRect();
  // eslint-disable-next-line no-param-reassign
  box.style.top = `${y - height / 2.5}px`;
};
export default goToCrystal;
