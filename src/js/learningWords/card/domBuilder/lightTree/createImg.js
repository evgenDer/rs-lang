export default function createImg(card) {
  console.log(card.settings);
  const img = new Image();
  img.onload = () => {
    card.insertAdjacentHTML('beforeend', `<img slot=cardImg src=${img.src}>`);

  }
  img.onerror = () => {
    card.insertAdjacentHTML('beforeend', `<img slot=cardImg src=${img.src}>`);
  }
  img.src = `https://raw.githubusercontent.com/irinainina/rslang-data/master/${card.state.image}`;
}
