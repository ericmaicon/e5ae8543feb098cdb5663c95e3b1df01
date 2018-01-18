import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import 'styles/main.scss';
import store from './store';
import history from 'browserHistory';
import LoginContainer from 'features/login/LoginContainer';
import PanelContainer from 'features/panel/PanelContainer';

ReactDOM.render(
  <Provider store={store()}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={LoginContainer} />
        <Route exact path='/panel' component={PanelContainer} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('app'));
