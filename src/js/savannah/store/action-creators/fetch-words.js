import { FETCH_WORDS } from '../../../utils/constants';

const { default: sendRequest } = require('../../../api/requests');

const fetchWordsAction = (data) => ({
  type: FETCH_WORDS,
  data,
});


function request({ complexity, round }) {
  return async (dispatch) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${complexity}`;
    const words = await sendRequest('GET', url);
    dispatch(fetchWordsAction(words));
  };
}

export default request;
