import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import SagaTester from 'redux-saga-tester';
import MockAdapter from 'axios-mock-adapter';

import sagas from 'sagas';
import { fetchTweets, FETCH_TWEETS_DONE } from './tweet';
import TweetContainer from './TweetContainer';


describe('Panel', () => {
  let sagaTester;
  const mock = new MockAdapter(axios);

  beforeEach(() => {
    sagaTester = new SagaTester({});
    sagaTester.start(sagas);
  });

  it('renders properly', () => {
    const tweet = {
      user: {
        profile_image_url: '',
        name: ''
      },
      created_at: '',
      text: ''
    };
    const div = document.createElement('div');
    ReactDOM.render(<TweetContainer tweet={tweet} />, div);
  });

  it('test fetchTweets', async () => {
    mock.onGet('/tweets').reply(200, {
      data: []
    });

    sagaTester.dispatch(fetchTweets());
    const action = await sagaTester.waitFor(FETCH_TWEETS_DONE);
    expect(action.response.data).toEqual([]);
  });
});
