import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import PanelContainer from './PanelContainer';


describe('Panel', () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  const Panel = mount(
    <Provider store={store}>
      <PanelContainer />
    </Provider>
  );

  it('renders properly', () => {
    expect(Panel).toMatchSnapshot();
  });
});
