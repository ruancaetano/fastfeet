import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function userReducer(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS':
        draft.profile = action.payload;
        break;
      case '@auth/@auth/SIGN_OUT':
        draft.profile = null;
        break;
      default:
        return state;
    }
  });
}
