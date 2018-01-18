import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import 'styles/main.scss';
import store from './store';
import LoginContainer from 'features/login/LoginContainer';
import PanelContainer from 'features/panel/PanelContainer';

ReactDOM.render(
  <Provider store={store()}>
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path='/' component={LoginContainer} />
        <Route exact path='/panel' component={PanelContainer} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('app'));
