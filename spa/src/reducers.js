import { combineReducers } from 'redux';

import { loginReducer as login } from 'features/login/login';

export default combineReducers({
  login
});
