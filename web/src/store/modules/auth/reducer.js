import produce from 'immer';

const INITIAL_STATE = {
  token: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@AUTH/AUTHENTICATION_SUCCESS':
      return produce(state, draftState => {
        draftState.token = action.payload.token;
      });
    case '@AUTH/LOGOUT':
      return { ...INITIAL_STATE };
    default:
      return state;
  }
}
