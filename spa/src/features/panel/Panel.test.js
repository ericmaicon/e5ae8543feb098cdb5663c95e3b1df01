import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import PanelContainer from './PanelContainer';

describe('Panel', () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    myAccount: {
      user: null
    },
    tweet: {
      tweets: []
    }
  });

  it('renders properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <PanelContainer />
      </Provider>, div);
  });
});
