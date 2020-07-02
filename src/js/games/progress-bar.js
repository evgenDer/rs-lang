/* eslint-disable no-param-reassign */

export function resetProgressPoint(point) {
  point.classList = ['game-progress__point'];
}

export function setCurrentProgressPoint(point) {
  resetProgressPoint(point);
  point.classList.add('game-progress__point_current');
}

export function setRightProgressPoint(point) {
  const wasWrong = point.classList.contains('game-progress__point_wrong');
  if (!wasWrong) {
    resetProgressPoint(point);
    point.classList.add('game-progress__point_right');
  }
}

export function setWrongProgressPoint(point) {
  resetProgressPoint(point);
  point.classList.add('game-progress__point_wrong');
}
