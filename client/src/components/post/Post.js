import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Post extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        <Container>
          <h1>Welcome to post</h1>
        </Container>
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
)(Post);
