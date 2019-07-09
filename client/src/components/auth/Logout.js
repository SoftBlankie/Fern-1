import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { clearUserPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  onClick = () => {
    this.props.clearUserPosts();
    this.props.logout();
  }

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.onClick} href='#'>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout, clearUserPosts }
)(Logout);
