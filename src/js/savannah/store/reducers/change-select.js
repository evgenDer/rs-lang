const { CHANGE_LEVEL, CHANGE_ROUND } = require('../../../utils/constants');

const changeLevelSelectReducer = (state, action) => {
  if (action.type === CHANGE_LEVEL) {
    return action.level;
  }
  return state;
};
const changeRoundSelectReducer = (state, action) => {
  if (action.type === CHANGE_ROUND) {
    return action.round;
  }
  return state;
};


export { changeLevelSelectReducer, changeRoundSelectReducer };
