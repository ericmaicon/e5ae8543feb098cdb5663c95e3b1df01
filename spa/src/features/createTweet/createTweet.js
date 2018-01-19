import { take, put } from 'redux-saga/effects';
import { reset } from 'redux-form';

import { fetchTweets } from 'features/tweet/tweet';
import createApiSaga from 'utils/sagas/createApiSaga';

export const CREATE_TWEET = 'tweet/create';
export const CREATE_TWEET_DONE = `${CREATE_TWEET}/done`;
export const CREATE_TWEET_FAIL = `${CREATE_TWEET}/fail`;

/**
 * action to create the tweet
 *
 * @param  string status
 * @return object
 */
export function createTweet(data) {
  return {
    type: CREATE_TWEET,
    data
  };
}

/**
 * saga that hit the api and create the tweet
 *
 * @type {Generator}
 */
export const createTweetSaga = createApiSaga(CREATE_TWEET, {
  path: '/tweet',
  'method': 'POST'
});

/**
 * saga that set the token after hit the api
 *
 * @return {Generator}
 */
export function* createTweetDoneSaga() {
  while(true) {
    const { response } = yield take(CREATE_TWEET_DONE);
    yield put(fetchTweets());
    yield put(reset('createTweetForm'));
  }
}
