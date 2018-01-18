import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { branch, compose, lifecycle, renderNothing } from 'recompose';

import history from 'browserHistory';
import PanelForm from './components/PanelForm';
import { fetchMe } from 'features/myAccount/myAccount';

const queryObject = queryString.parse(history.location.search);

const mapStateToProps = (state) => {
  return {
    user: state.myAccount.user
  };
};

const mapDispatchToProps = {
  fetchMe,
  
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount: function componentDidMount() {
      const { fetchMe } = this.props;
      const { oauth_token, oauth_verifier } = queryObject;

      fetchMe(oauth_token, oauth_verifier);
    }
  }),
  branch(({ user }) => !user, renderNothing)
)(PanelForm);
