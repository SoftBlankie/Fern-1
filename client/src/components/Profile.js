import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Profile extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    if (!this.props.isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Profile);
