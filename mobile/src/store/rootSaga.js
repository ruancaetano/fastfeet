import { all } from 'redux-saga/effects';

import auth from './modules/auth/sagas';

export default function* rootSaga() {
  return yield all([auth]);
}
