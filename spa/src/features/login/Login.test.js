import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import LoginContainer from './LoginContainer';


describe('Login', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  const login = mount(
    <Provider store={store}>
      <LoginContainer />
    </Provider>
  );

  it('renders properly', () => {
    expect(login).toMatchSnapshot();
  });
});
