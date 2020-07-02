export default function createImg(card) {
  const img = new Image();
  if (card.state.image.length > 20) {
    img.src = `data:image/jpg;base64,${card.state.image}`;
  } else {
    img.src = `https://raw.githubusercontent.com/irinainina/rslang-data/master/${card.state.image}`;
  }

  img.onload = () => {
    card.insertAdjacentHTML(
      'beforeend',
      `<div slot=cardImg>
    <img  src=${img.src} style='object-fit: cover; width: 130px; height: 130px'>
    </div>`,
    );
  };
  img.onerror = () => {
    card.insertAdjacentHTML('beforeend', `<img slot=cardImg src='assets/img/cardDefaultImg.jpg'>`);
  };
}
