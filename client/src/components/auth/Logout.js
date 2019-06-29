import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';

export class Logout extends Component {
  render() {
    return (
      <Fragment>
        <NavLink href="#">
          Logout
        </NavLink>
      </Fragment>
    )
  }
}

export default Logout;
