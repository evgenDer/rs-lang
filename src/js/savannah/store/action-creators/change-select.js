const { CHANGE_ROUND, CHANGE_LEVEL } = require('../../../utils/constants');

const changeLevelSelectAction = (level) => ({
  type: CHANGE_LEVEL,
  level,

});

const changeRoundSelectAction = (round) => ({
  type: CHANGE_ROUND,
  round,
});

export { changeLevelSelectAction, changeRoundSelectAction };
