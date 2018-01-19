import _ from 'lodash';
import axios from 'axios';
import { take, call, put, select } from 'redux-saga/effects';

import { hasToken, getToken } from 'utils/auth/tokenManager';

/**
 * method that creates a saga to hit the api using axios
 *
 * @param  {string} actionString
 * @param  {object} httpSpecParam
 */
export default (actionString, httpSpecParam) => {
  return function* () {
    while (true) {
      const action = yield take(actionString);

      let httpSpec = httpSpecParam;
      try {
        let headers = {};

        if (hasToken()) {
          headers = getToken();
        }

        const response = yield call(axios, {
          baseURL: APP.API_URL,
          url: httpSpec.path,
          method: httpSpec.method || 'GET',
          params: action.params,
          data: action.data,
          headers
        });

        yield put({
          type: `${actionString}/done`,
          response: response.data,
          payload: action
        });

      } catch (error) {
        yield put({
          type: `${actionString}/fail`,
          response: error,
          payload: action
        });
      }
    }
  };
};
