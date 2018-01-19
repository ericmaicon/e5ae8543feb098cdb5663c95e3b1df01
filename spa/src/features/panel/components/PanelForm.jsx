import React from 'react';

import TweetContainer from 'features/tweet/TweetContainer';

const PanelForm = ({
  user,
  tweets,
  handleFetchTweets,
  handleDisconnect
}) => (
  <div className='container panel-container'>
    <div className='card card-header' style={{
      backgroundImage: `url(${user.profile_background_image_url})`
    }}>
      <img src={user.profile_image_url} className='rounded mx-auto d-block' />
      <h3>{user.name}</h3>
      <p>{user.screen_name}</p>
      <p>{user.location}</p>
      <div className='btn-group'>
        <a
          className='btn btn-primary'
          href='javascript:;'
          onClick={handleFetchTweets}
        >
          Refresh Tweets
        </a>
        <a
          className='btn btn-secondary'
          href='javascript:;'
          onClick={handleDisconnect}
        >
          Logout
        </a>
      </div>
    </div>
    {tweets.length > 0 && tweets.map(tweet =>
      <TweetContainer
        tweet={tweet}
        key={tweet.id}
      />
    )}
    {tweets.length === 0 && (
      <div className='card card-content'>
        <p>Press Refresh button to fetch your tweets.</p>
      </div>
    )}
  </div>
);

export default PanelForm;
