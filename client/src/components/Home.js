import React, { Component, Fragment } from 'react';
import {

} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const landingPage = (
      <Fragment>
        <h1>Landing Page</h1>
      </Fragment>
    );

    const homePage = (
      <Fragment>
        <h1>Home Page</h1>
      </Fragment>
    );

    return (
      <div>
        {!isAuthenticated ? landingPage : homePage}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Home);
