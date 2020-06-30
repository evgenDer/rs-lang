export default function shuffleArray(currentArr) {
  const mixedArr = [...currentArr];
  for (let i = mixedArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = mixedArr[j];
    mixedArr[j] = mixedArr[i];
    mixedArr[i] = temp;
  }
  return mixedArr;
}
