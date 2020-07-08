const { ANSWER_ERROR, RESET_ERRORS } = require('../../../utils/constants');

const errorsReducer = (state, action) => {
  switch (action.type) {
    case ANSWER_ERROR:
      return state + 1;
    case RESET_ERRORS:
      return 0;
    default:
      return state;
  }
};

export default errorsReducer;
