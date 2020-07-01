/* eslint-disable no-param-reassign */

const curLvl = document.getElementById('game-control__current_level');
const listLvl = document.querySelectorAll('.game-control__list_level li');

const curRound = document.getElementById('game-control__current_round');
const listRound = document.querySelectorAll('.game-control__list_round li');


export function getCurrentLevel() {
  return (+curLvl.textContent) - 1;
}

function resetLevelList() {
  listLvl.forEach((level) => {
    level.classList.remove('list__active');
  });
}

function addLevelListEventHandler() {
  listLvl.forEach((level) => {
    level.onclick = () => {
      resetLevelList();
      const ind = level.textContent.split(' ').pop();
      level.classList.add('list__active');

      curLvl.textContent = ind;
    }
  });
}


export function getCurrentRound() {
  return (+curRound.textContent) - 1;
}

function resetRoundList() {
  listRound.forEach((round) => {
    round.classList.remove('list__active');
  });
}

function addRoundListEventHandler() {
  listRound.forEach((round) => {
    round.onclick = () => {
      resetRoundList();
      const ind = round.textContent.split(' ').pop();
      round.classList.add('list__active');

      curRound.textContent = ind;
    }
  });
}


export function addDropdownsEventHandlers() {
  addLevelListEventHandler();
  addRoundListEventHandler();
}
