import { fork } from 'redux-saga/effects';

import { loginSaga, loginDoneSaga } from 'features/login/login';

const sagas = [
  loginSaga, loginDoneSaga
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
};
