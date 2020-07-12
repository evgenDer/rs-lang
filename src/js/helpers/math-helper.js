export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function shuffleArray(array) {
  console.log(array);
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}
