import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { myAccountReducer as myAccount } from 'features/myAccount/myAccount';
import { tweetReducer as tweet } from 'features/tweet/tweet';

export default combineReducers({
  form,
  myAccount,
  tweet
});
