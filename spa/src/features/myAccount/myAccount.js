import { take } from 'redux-saga/effects';

import history from 'browserHistory';
import createApiSaga from 'utils/sagas/createApiSaga';
import { setToken, dropToken } from 'utils/auth/tokenManager';

export const FETCH_ME = 'fetchMe/fetch';
export const FETCH_ME_DONE = `${FETCH_ME}/done`;
export const FETCH_ME_FAIL = `${FETCH_ME}/fail`;

export const LOGOUT = 'logout/fetch';
export const LOGOUT_DONE = `${LOGOUT}/done`;

/**
 * Reducer to map user data
 * 
 * @param  object state
 * @param  object action
 * @return object
 */
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

/**
 * action to fetch user data
 *
 * @param  string oauth_token
 * @param  string oauth_verifier
 * @return object
 */
export function fetchMe(oauth_token, oauth_verifier) {
  return {
    type: FETCH_ME,
    data: {
      oauth_token,
      oauth_verifier
    }
  };
}

/**
 * saga that hit the api and collect user data
 *
 * @type {Generator}
 */
export const fetchMeSaga = createApiSaga(FETCH_ME, {
  path: '/connect',
  'method': 'POST'
});

/**
 * saga that set the token after hit the api
 *
 * @return {Generator}
 */
export function* fetchMeDoneSaga() {
  while(true) {
    const { response } = yield take(FETCH_ME_DONE);
    setToken(response.token.oauth_token, response.token.oauth_token_secret);
  }
}

/**
 * fail to hit the api?! drop the token and redirect to login
 *
 * @return {Generator}
 */
export function* fetchMeFailSaga() {
  while(true) {
    const { response } = yield take(FETCH_ME_FAIL);
    history.push('/');
    dropToken();
  }
}

/**
 * action to logout the user
 *
 * @return object
 */
export function logOut() {
  return {
    type: LOGOUT
  };
}

/**
 * saga to let the logout action hit the api
 *
 * @type {Generator}
 */
export const logOutSaga = createApiSaga(LOGOUT, {
  path: '/disconnect',
  'method': 'POST'
});

/**
 * when logout is done, redirect and drop the token
 *
 * @return {Generator}
 */
export function* logOutDoneSaga() {
  while(true) {
    const { response } = yield take(LOGOUT_DONE);
    history.push('/');
    dropToken();
  }
}
