import createApiSaga from 'utils/sagas/createApiSaga';

export const FETCH_TWEETS = 'fetchTweets/fetch';
export const FETCH_TWEETS_DONE = `${FETCH_TWEETS}/done`;
export const FETCH_TWEETS_FAIL = `${FETCH_TWEETS}/fail`;

export function myAccountReducer(state = { tweets: [] }, action) {
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

export function fetchMe(oauth_token, oauth_verifier) {
  return {
    type: FETCH_TWEETS,
    data: {
      oauth_token,
      oauth_verifier
    }
  };
}

export const fetchMeSaga = createApiSaga(FETCH_TWEETS, {
  path: '/connect',
  'method': 'POST'
});

export function* fetchMeDoneSaga() {
  while(true) {
    const { response } = yield take(FETCH_TWEETS_DONE);
    setToken(response.token.oauth_token, response.token.oauth_token_secret);
  }
}
