import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import sagas from 'sagas';
import LoginContainer from './LoginContainer';
import { logIn, LOGIN_DONE } from './login';

describe('Login', () => {
  let sagaTester;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(sagas);
  });

  it('renders properly', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});

    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>, div);
  });

  it('test login', async () => {
    mock.onGet('/oauth_request').reply(200, {
      data: 'http://some-url'
    });

    sagaTester.dispatch(logIn());
    await sagaTester.waitFor(LOGIN_DONE);
    const action = sagaTester.getLatestCalledAction();
    expect(action.type).toEqual(LOGIN_DONE);
    expect(action.response.data).toEqual('http://some-url');
  });
});
