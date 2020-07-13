export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getMaxIndexValue(array){
  let max = array[0];
  for (let i = 0; i < array.length; i+=1) {
      if (max < array[i]) max = i;
  }
  return max;
}

