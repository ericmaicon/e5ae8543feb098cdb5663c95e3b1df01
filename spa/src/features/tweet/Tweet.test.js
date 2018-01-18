import React from 'react';
import ReactDOM from 'react-dom';

import TweetContainer from './TweetContainer';

describe('Panel', () => {
  it('renders properly', () => {
    const tweet = {
      user: {
        profile_image_url: '',
        name: ''
      },
      created_at: '',
      text: ''
    };
    const div = document.createElement('div');
    ReactDOM.render(<TweetContainer tweet={tweet} />, div);
  });
});
