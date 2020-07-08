import { ADD_QUEUE_NUMBER, RESET_QUEUE } from '../../../utils/constants';


const checkOnDublicateReducer = (state, action) => {
  switch (action.type) {
    case ADD_QUEUE_NUMBER:
      return [...state, action.number];
    case RESET_QUEUE:
      return [];
    default:
      return state;
  }
};

export default checkOnDublicateReducer;
