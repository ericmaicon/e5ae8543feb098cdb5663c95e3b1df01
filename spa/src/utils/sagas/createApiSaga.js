import _ from 'lodash';
import axios from 'axios';
import { take, call, put, select } from 'redux-saga/effects';

export default (actionString, httpSpecParam) => {
  return function* () {
    while (true) {
      const action = yield take(actionString);

      let httpSpec = httpSpecParam;
      try {
        const response = yield call(axios, {
          baseURL: APP.API_URL,
          url: httpSpec.path,
          method: httpSpec.method || 'GET',
          params: action.params
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
