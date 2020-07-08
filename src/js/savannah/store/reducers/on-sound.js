const { SOUND_ON, SOUND_OFF } = require('../../../utils/constants');

const onSoundReducer = (state, action) => {
  switch (action.type) {
    case SOUND_ON:
      return true;
    case SOUND_OFF:
      return false;
    default:
      return state;
  }
};

export default onSoundReducer;
