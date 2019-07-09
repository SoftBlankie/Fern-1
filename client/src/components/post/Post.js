import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Post extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    if (!isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        <Container>
        </Container>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Post);
