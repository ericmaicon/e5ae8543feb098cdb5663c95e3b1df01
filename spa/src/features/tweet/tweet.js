import createApiSaga from 'utils/sagas/createApiSaga';

export const FETCH_TWEETS = 'fetchTweets/fetch';
export const FETCH_TWEETS_DONE = `${FETCH_TWEETS}/done`;
export const FETCH_TWEETS_FAIL = `${FETCH_TWEETS}/fail`;

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

export function fetchTweets() {
  return {
    type: FETCH_TWEETS
  };
}

export const fetchTweetsSaga = createApiSaga(FETCH_TWEETS, {
  path: '/tweets',
});
