import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'styles/main.scss';
import store from './store';
import LoginContainer from 'features/login/LoginContainer';

ReactDOM.render(
  <Provider store={store()}>
    <LoginContainer />
  </Provider>, document.getElementById('app'));
