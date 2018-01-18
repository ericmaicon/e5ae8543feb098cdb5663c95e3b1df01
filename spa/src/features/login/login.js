import { take } from 'redux-saga/effects';
import createApiSaga from 'utils/sagas/createApiSaga';

export const LOGIN = 'login/fetch';
export const LOGIN_DONE = `${LOGIN}/done`;
export const LOGIN_FAIL = `${LOGIN}/fail`;

export function logIn() {
  return {
    type: LOGIN,
    params: {
      'callback_url': 'http://localhost:8080/panel'
    }
  };
}

export const loginSaga = createApiSaga(LOGIN, {
  path: '/oauth_request'
});

export function* loginDoneSaga() {
  while(true) {
    const { response } = yield take(LOGIN_DONE);
    window.location = response.data;
  }
}
