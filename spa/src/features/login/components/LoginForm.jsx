import React from 'react';

import Logo from 'sprites/logo.png';

const LoginForm = ({
  handleLogin
}) => (
  <div className='container login-container'>
    <div className='card'>
      <img src={Logo} width='151' />
      <h3>Sample application using Twitter API</h3>
      <p>Press the button to login with your user</p>
      <a
        className='btn btn-lg btn-primary btn-block'
        href='javascript:;'
        onClick={handleLogin}
      >
        Sign in
      </a>
    </div>
  </div>
);

export default LoginForm;
