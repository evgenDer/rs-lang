import { FETCH_WORDS } from '../../../utils/constants';

function fetchWordsReducer(state, action) {
  switch (action.type) {
    case FETCH_WORDS:
      return action.data;
    default:
      return state;
  }
}

export default fetchWordsReducer;
