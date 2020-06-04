import React, { Component } from 'react';
import {
  NavLink
} from 'reactstrap';

class Profile extends Component {
  render() {
    return (
      <div>
        <NavLink href='#'>
          Profile
        </NavLink>
      </div>
    );
  }
}

export default Profile;
