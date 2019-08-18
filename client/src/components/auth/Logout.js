import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  onClick = () => {
    this.props.logout();
  }

  render() {
    return (
      <Fragment>
        <NavLink tag={Link} to='/' onClick={this.onClick}>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
