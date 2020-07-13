const rnd = (max = 20, rndTrash = []) => {
  const number = Math.floor(Math.random() * max);
  return rndTrash.includes(number) ? rnd(rndTrash) : number;
};

export default rnd;
