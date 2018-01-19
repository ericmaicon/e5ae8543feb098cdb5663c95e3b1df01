import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CreateTweetContainer from './CreateTweetContainer';

describe('CreateTweet', () => {
  const mockStore = configureStore([]);
  const store = mockStore({
  });

  it('renders properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <CreateTweetContainer />
      </Provider>, div);
  });
});
