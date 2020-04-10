import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload: userId }) {
  try {
    const response = yield call(api.get, `/deliverymen/${userId}`);

    const user = response.data;

    yield put(signInSuccess(user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha na autenticação',
      'Falha na autenticação, verifique o id informado!'
    );
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
