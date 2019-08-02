import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Searchbar from './Searchbar';

import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    if (window.innerWidth <= 760) {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem onClick={this.toggle}>
          <NavLink tag={Link} to={`/${user ? user.name : ''}`}>Home</NavLink>
        </NavItem>
        <NavItem onClick={this.toggle}>
          <NavLink tag={Link} to={`/${user ? user.name : 0}/profile`}>Profile</NavLink>
        </NavItem>
        <NavItem onClick={this.toggle}>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem onClick={this.toggle}>
          <RegisterModal />
        </NavItem>
        <NavItem onClick={this.toggle}>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5' style={{ zIndex: 99 }}>
          <Container>
            <NavbarBrand tag={Link} to={`/${user ? user.name : 0}`}>Fern</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {isAuthenticated ? <Searchbar /> : !<Searchbar />}
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
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
)(AppNavbar);
