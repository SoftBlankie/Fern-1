import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';
import { logout } from '../../actions/authActions';
import { clearProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  onClick = () => {
    this.props.logout();
    this.props.clearProfile();
  }

  render() {
    return (
      <DropdownItem tag={Link} to='/' onClick={this.onClick}>
        Logout
      </DropdownItem>
    );
  }
}

export default connect(
  null,
  { logout, clearProfile }
)(Logout);
