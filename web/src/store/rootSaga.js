import { all } from 'redux-saga/effects';

import auth from './modules/auth/sagas';

export default function* rootSaga() {
  yield all([auth]);
}
