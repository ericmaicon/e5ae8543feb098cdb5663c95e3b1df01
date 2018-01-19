import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import { branch, compose, lifecycle, renderNothing, withHandlers } from 'recompose';

import CreateTweetForm from './components/CreateTweetForm';
import { createTweet } from './createTweet';

const validationConstraints = {
  status: {
    presence: {
      message: 'You need to fill the status.'
    }
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
  createTweet
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'createTweetForm',
    validate: (values) => validate(values, validationConstraints, {
      fullMessages: false
    }),
  }),
  withHandlers({
    handleTweet: ({ createTweet, handleSubmit }) => handleSubmit(values => {
      createTweet(values);
    })
  })
)(CreateTweetForm);
