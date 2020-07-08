import store from '../store/store';
import { changeLevelSelectAction, changeRoundSelectAction } from '../store/action-creators/change-select';
import request from '../store/action-creators/fetch-words';

const hangEventOnSelect = (isLevel, event) => {
  const { value } = event.target;
  const { dispatch } = store;
  const { complexity, round } = store.getState();
  const param = { complexity, round };


  if (isLevel) {
    dispatch(changeLevelSelectAction(value));
    param.complexity = value;
  } else {
    dispatch(changeRoundSelectAction(value));
    param.round = value;
  }

  dispatch(request(param));
};


export default hangEventOnSelect;
