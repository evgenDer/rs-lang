import fetchWordsReducer from './reducers/fetch-words';
import { changeRoundSelectReducer, changeLevelSelectReducer } from './reducers/change-select';
import onSoundReducer from './reducers/on-sound';
import checkOnDublicateReducer from './reducers/dublicate';
import errorsReducer from './reducers/errors';

// Инициализация хранилища


function combineReducers(reducersMap) {
  return function combinationReducer(state, action) {
    const nextState = {};
    Object.entries(reducersMap).forEach(([key, reducer]) => {
      nextState[key] = reducer(state[key], action);
    });
    return nextState;
  };
}


function createStore(reducer, initState) {
  let state = initState;
  return {
    dispatch: (action) => {
      state = reducer(state, action);
    },
    getState: () => state,

  };
}


const initState = {
  words: [],
  complexity: '0',
  round: '0',
  sound: true,
  dublicate: [],
  errors: 0,
};

const thunk = (store) => (dispatch) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  return dispatch(action);
};

function applyMiddleware(middleware) {
  return function createStoreWithMiddleware(crtStore) {
    return (reducer, state) => {
      const store = crtStore(reducer, state);

      return {
        dispatch: (action) => middleware(store)(store.dispatch)(action),
        getState: store.getState,
      };
    };
  };
}


const reducers = combineReducers({
  words: fetchWordsReducer,
  complexity: changeLevelSelectReducer,
  round: changeRoundSelectReducer,
  sound: onSoundReducer,
  dublicate: checkOnDublicateReducer,
  errors: errorsReducer,
});
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers, initState);


export default store;
