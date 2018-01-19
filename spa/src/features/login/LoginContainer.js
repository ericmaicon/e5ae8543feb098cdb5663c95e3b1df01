import React from 'react';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { logIn } from './login';
import LoginForm from './components/LoginForm';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  logIn
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleLogin: ({ logIn }) => () => {
      logIn();
    }
  })
)(LoginForm);
