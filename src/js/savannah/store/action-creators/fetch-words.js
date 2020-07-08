import { FETCH_WORDS } from '../../../utils/constants';
import spinnerCreator from '../../../utils/savannah_spinner';
import createMainOnStartingPage from '../../main-page/start-button';


const { default: sendRequest } = require('../../../api/requests');

const fetchWordsAction = (data) => ({
  type: FETCH_WORDS,
  data,
});


function request({ complexity, round }) {
  const gameContainerStart = document.querySelector('.game-container__start');

  if (gameContainerStart) {
    gameContainerStart.remove();
  }

  const spinner = spinnerCreator(8);
  document.body.append(spinner);

  return async (dispatch) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${round}&group=${complexity}`;
    const words = await sendRequest('GET', url);

    dispatch(fetchWordsAction(words));
    spinner.remove();

    createMainOnStartingPage();
    // if (gameContainerStart) {
    //   document.body.append(gameContainerStart);
    // }
  };
}

export default request;
