import { fork } from 'redux-saga/effects';

import { loginSaga, loginDoneSaga } from 'features/login/login';
import { fetchMeSaga, fetchMeDoneSaga, fetchMeFailSaga, logOutSaga, logOutDoneSaga } from 'features/myAccount/myAccount';
import { fetchTweetsSaga } from 'features/tweet/tweet';

const sagas = [
  loginSaga, loginDoneSaga,
  fetchMeSaga, fetchMeDoneSaga, fetchMeFailSaga, logOutSaga, logOutDoneSaga,
  fetchTweetsSaga,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
};
