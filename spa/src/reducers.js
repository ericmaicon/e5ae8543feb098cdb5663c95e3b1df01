import { combineReducers } from 'redux';

import { myAccountReducer as myAccount } from 'features/myAccount/myAccount';
import { tweetReducer as tweet } from 'features/tweet/tweet';

export default combineReducers({
  myAccount,
  tweet
});
