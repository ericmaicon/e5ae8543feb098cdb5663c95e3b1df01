import axios from 'axios';
import React from 'react';
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import sagas from 'sagas';
import { fetchMe, logOut, FETCH_ME_DONE, LOGOUT_DONE } from './myAccount';
import { FETCH_TWEETS } from 'features/tweet/tweet';

describe('Login', () => {
  let sagaTester;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(sagas);
  });

  it('test fetchMe', async () => {
    mock.onPost('/connect').reply(200, {
      user: {},
      token: {
        oauth_token: 'token',
        oauth_token_secret: 'secret'
      }
    });

    sagaTester.dispatch(fetchMe('token', 'secret'));
    const action = await sagaTester.waitFor(FETCH_ME_DONE);
    expect(action.response.token.oauth_token).toEqual('token');
    const lastAction = sagaTester.getLatestCalledAction();
    expect(lastAction.type).toEqual(FETCH_TWEETS);
  });
});
