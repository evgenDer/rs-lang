const { default: store } = require('./store/store');
const { SOUND_OFF, SOUND_ON } = require('../utils/constants');
const { default: onSoundAction } = require('./store/action-creators/on-sound');

const onSound = () => {
  const { sound } = store.getState();
  const switcher = document.querySelector('.process__switcher');
  if (sound) {
    store.dispatch(onSoundAction(SOUND_OFF));
    switcher.textContent = 'off';
  } else {
    store.dispatch(onSoundAction(SOUND_ON));
    switcher.textContent = 'on';
  }
};

export default onSound;
