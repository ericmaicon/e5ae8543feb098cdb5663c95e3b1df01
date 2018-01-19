import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
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

  const Component = () => (
    <Provider store={store}>
      <PanelContainer />
    </Provider>
  );

  it('renders properly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component />, div);
  });
});
