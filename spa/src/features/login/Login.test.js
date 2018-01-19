import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import LoginContainer from './LoginContainer';
import { loginSaga, loginDoneSaga } from './login';

describe('Login', () => {
  it('renders properly', () => {
    const mockStore = configureStore([]);
    const store = mockStore({});

    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <LoginContainer />
      </Provider>, div);
  });
});
