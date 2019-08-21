import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Searchbar from './Searchbar';

import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';

class AppNavbar extends Component {
  state = {
    isOpen: false,
    dropdownOpen: false
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

  dropdownToggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
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
          <NavLink tag={Link} to={`/${user ? user.name : ''}/profile`}>Profile</NavLink>
        </NavItem>
        <Dropdown nav inNavbar isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
          <DropdownToggle nav caret></DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to={`/${user ? user.name : ''}/help`}>
              Help
            </DropdownItem>
            <DropdownItem tag={Link} to={`/${user ? user.name : ''}/contact`}>
              Contact
            </DropdownItem>
            <DropdownItem divider />
            <Logout />
          </DropdownMenu>
        </Dropdown>
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

    const infoLinks = (
      <Fragment>
        <NavItem onClick={this.toggle}>
          <NavLink tag={Link} to={'/info/about'}>About</NavLink>
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' style={{ zIndex: 99 }}>
          <Container>
            <NavbarBrand tag={Link} to={`/${user ? user.name : null}`}>Fern</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              {isAuthenticated ? <Searchbar /> : null}
              <Nav navbar>
                {!isAuthenticated ? infoLinks : null}
              </Nav>
              <Nav className='ml-auto' navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        {isAuthenticated ? (
          <div className='mb-5'></div>
        ) : null}
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
