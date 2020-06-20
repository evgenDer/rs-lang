export default function createEventListener(card) {
  card.addEventListener('click', () => {
    let item = null;
    if (event.target.closest('div[slot=buttonLeft]') != null) {
      card.remove();
    } else if (event.target.closest('div[slot=buttonRight]') != null) {

    }
  })
}
