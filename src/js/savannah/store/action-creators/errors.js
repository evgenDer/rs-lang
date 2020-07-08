const { ANSWER_ERROR, RESET_ERRORS } = require('../../../utils/constants');

const errorsAction = () => ({
  type: ANSWER_ERROR,
});

const resetErrorsAction = () => ({
  type: RESET_ERRORS,
});

export { errorsAction, resetErrorsAction };
