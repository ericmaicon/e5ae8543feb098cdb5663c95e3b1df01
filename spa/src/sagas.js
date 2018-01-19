import { fork } from 'redux-saga/effects';

import { createTweetSaga, createTweetDoneSaga } from 'features/createTweet/createTweet';
import { loginSaga, loginDoneSaga } from 'features/login/login';
import { fetchMeSaga, fetchMeDoneSaga, fetchMeFailSaga, logOutSaga, logOutDoneSaga } from 'features/myAccount/myAccount';
import { fetchTweetsSaga } from 'features/tweet/tweet';

const sagas = [
  createTweetSaga, createTweetDoneSaga,
  loginSaga, loginDoneSaga,
  fetchMeSaga, fetchMeDoneSaga, fetchMeFailSaga, logOutSaga, logOutDoneSaga,
  fetchTweetsSaga,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
};
