import React from 'react';

const TweetForm = ({
  tweet
}) => (
  <div className='card tweet'>
    <div className='card-body'>
      <img src={tweet.user.profile_image_url} className='img-thumb rounded float-left' />
      <h5 className='card-title'>{tweet.user.name}</h5>
      <small>{tweet.created_at}</small>
      <p className='card-text' dangerouslySetInnerHTML={{__html: tweet.text}}>
      </p>
    </div>
  </div>
);

export default TweetForm;
