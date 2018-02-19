const INITIAL_STATE = false;

export default function modal(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'IS_OPEN_MODAL': {
      console.log('catch');
      return !state
    }
    default: return state;
  }
}