import { take } from 'redux-saga/effects';

import createApiSaga from 'utils/sagas/createApiSaga';
import { setToken } from 'utils/auth/tokenManager';

export const FETCH_ME = 'fetchMe/fetch';
export const FETCH_ME_DONE = `${FETCH_ME}/done`;
export const FETCH_ME_FAIL = `${FETCH_ME}/fail`;

export function myAccountReducer(state = { user: null }, action) {
  switch (action.type) {
  case FETCH_ME_DONE:
    return {
      ...state,
      user: action.response.data
    };
  default:
    return state;
  }
}

export function fetchMe(oauth_token, oauth_verifier) {
  return {
    type: FETCH_ME,
    data: {
      oauth_token,
      oauth_verifier
    }
  };
}

export const fetchMeSaga = createApiSaga(FETCH_ME, {
  path: '/connect',
  'method': 'POST'
});

export function* fetchMeDoneSaga() {
  while(true) {
    const { response } = yield take(FETCH_ME_DONE);
    setToken(response.token.oauth_token, response.token.oauth_token_secret);
  }
}
