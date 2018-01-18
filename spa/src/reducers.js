import { combineReducers } from 'redux';

import { myAccountReducer as myAccount } from 'features/myAccount/myAccount';

export default combineReducers({
  myAccount
});
