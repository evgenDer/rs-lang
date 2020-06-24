import hangEventOnWindow from './mainpage';
import '../../sass/abstract/bootstrap.min.css';
import store from './store/store';
import request from './store/action-creators/fetch-words';


store.dispatch(request({ complexity: 0, round: 0 }));
hangEventOnWindow();
