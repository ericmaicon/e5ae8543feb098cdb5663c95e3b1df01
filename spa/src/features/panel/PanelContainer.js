import React from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PanelForm from './components/PanelForm';

const mapStateToProps = (state) => {
  return {

  };
}

const mapDispatchToProps = {
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PanelForm);
