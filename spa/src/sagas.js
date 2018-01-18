import { fork } from 'redux-saga/effects';

import { loginSaga, loginDoneSaga } from 'features/login/login';
import { fetchMeSaga, fetchMeDoneSaga } from 'features/myAccount/myAccount';

const sagas = [
  loginSaga, loginDoneSaga,
  fetchMeSaga, fetchMeDoneSaga,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
};
