import { fork } from 'redux-saga/effects';

import { loginSaga, loginDoneSaga } from 'features/login/login';
import { fetchMeSaga, fetchMeDoneSaga } from 'features/myAccount/myAccount';
import { fetchTweetsSaga } from 'features/tweet/tweet';

const sagas = [
  loginSaga, loginDoneSaga,
  fetchMeSaga, fetchMeDoneSaga,
  fetchTweetsSaga,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
};
