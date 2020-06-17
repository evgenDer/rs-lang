export default function removeAnswerFromInput(card) {
  const w2 = card.querySelector('[slot=word2]');
  if (w2 != null) { w2.remove() };
  const w3 = card.querySelector('[slot=word3]');
  if (w3 != null) { w3.remove() };
}
