import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem } from 'reactstrap';
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
      <DropdownItem tag={Link} to='/' onClick={this.onClick}>
        Logout
      </DropdownItem>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
