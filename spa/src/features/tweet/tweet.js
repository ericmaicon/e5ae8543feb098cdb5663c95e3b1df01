import createApiSaga from 'utils/sagas/createApiSaga';

export const FETCH_TWEETS = 'fetchTweets/fetch';
export const FETCH_TWEETS_DONE = `${FETCH_TWEETS}/done`;
export const FETCH_TWEETS_FAIL = `${FETCH_TWEETS}/fail`;

/**
 * reducer to map tweets
 *
 * @param  object state
 * @param  object action
 * @return object
 */
export function tweetReducer(state = { tweets: [] }, action) {
  switch (action.type) {
  case FETCH_TWEETS_DONE:
    return {
      ...state,
      tweets: action.response.data
    };
  default:
    return state;
  }
}

/**
 * action to fetch tweets
 *
 * @return object
 */
export function fetchTweets() {
  return {
    type: FETCH_TWEETS
  };
}

/**
 * saga to hit the API and fetch tweets
 *
 * @type {Generator}
 */
export const fetchTweetsSaga = createApiSaga(FETCH_TWEETS, {
  path: '/tweets',
});
