const { ADD_QUEUE_NUMBER, RESET_QUEUE } = require('../../../utils/constants');

const checkOnDublicateAction = (number) => ({
  type: ADD_QUEUE_NUMBER,
  number,
});

const resetQueueAction = () => ({ type: RESET_QUEUE });

export { checkOnDublicateAction, resetQueueAction };
