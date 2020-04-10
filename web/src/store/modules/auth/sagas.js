import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { authenticationSuccess } from './actions';

function* rehydrate(action) {
  if (action.payload && action.payload.auth && action.payload.auth.token) {
    api.defaults.headers.common.Authorization = `Bearer ${action.payload.auth.token}`;
  }
}

function* authenticate(action) {
  try {
    const response = yield call(api.post, '/sessions', action.payload);
    api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
    yield put(authenticationSuccess(response.data));
    history.push('/orders');
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export default all([
  takeLatest('@AUTH/AUTHENTICATION', authenticate),
  takeLatest('persist/REHYDRATE', rehydrate),
]);
