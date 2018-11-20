import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import actions from '~/client/state/actions';
import selectors from '~/client/state/selectors';

class Home extends Component {
  componentDidMount = () => {
    actions.getTestData();
  };

  render = () => {
    console.log(this.props.testData);

    return (
      <div>Home route</div>
    );
  }
}

Home.propTypes = {
  testData: PropTypes.object,
};

export default connect((state) => ({
  testData: selectors.testData(state),
}))(Home);
