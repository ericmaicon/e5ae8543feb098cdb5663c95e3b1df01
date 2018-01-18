import React from 'react';

const PanelForm = ({
  user
}) => (
  <div className='container panel-container'>
    <div className='card' style={{
      backgroundImage: `url(${user.profile_background_image_url})`
    }}>
      <img src={user.profile_image_url} className='rounded mx-auto d-block' />
      <h3>{user.name}</h3>
      <p>{user.location}</p>
      <div className='btn-group'>
        <a
          className='btn btn-primary'
          href='javascript:;'
        >
          Refresh
        </a>
        <a
          className='btn btn-secondary'
          href='javascript:;'
        >
          Logout
        </a>
      </div>
    </div>
    <div className='card'>
    </div>
  </div>
);

export default PanelForm;
