import store from './store/store';
import request from './store/action-creators/fetch-words';
import createHeaderOnStartingPage from './main-page/start-page';

store.dispatch(request({ complexity: 0, round: 0 }));

createHeaderOnStartingPage();
