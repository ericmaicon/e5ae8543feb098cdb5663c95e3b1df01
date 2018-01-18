import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import TweetForm from './components/TweetForm';

export default compose(
  setPropTypes({
    tweet: PropTypes.object.isRequired
  })
)(TweetForm);
