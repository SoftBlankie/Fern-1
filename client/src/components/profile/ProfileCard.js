import React, { Component } from 'react';
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from 'reactstrap';
import {
  getProfile,
  clearProfile,
  updateProfile,
  followProfile
} from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UpdateModal from './UpdateModal';
import Person from '@material-ui/icons/Person';

class ProfileCard extends Component {
  state = {
    user_followings: this.props.user_followings
  };

  componentDidMount() {
    if (!this.props.isProfile) this.props.getProfile(this.props.user_id);
  };

  onUpdate = (age, location, learning, native, about) => {
    const newProfile = {
      age: age,
      location: location,
      learning: learning,
      native: native,
      about: about
    };

    this.props.updateProfile(this.props.user_id, newProfile);
  };

  onFollow = () => {
    const { profile } = this.props.profile;

    if (profile) {
      let followings = this.state.user_followings;
      followings.push(profile.name);

      let { followers } = profile;
      followers.push(this.props.user_name);

      const newFollowing = {
        followings: followings
      };

      const newFollower = {
        followers: followers
      };

      this.props.followProfile(this.props.user_id, profile.id, newFollowing, newFollower);
    }
  };

  onUnfollow = () => {
    const { profile } = this.props.profile;
    var index;

    if (profile) {
      let followings = this.state.user_followings;
      index = followings.indexOf(profile.name);
      if (index !== -1) followings.splice(index, 1);
      index = followings.indexOf('User2');
      if (index !== -1) followings.splice(index, 1);

      let { followers } = profile;
      index = followers.indexOf(this.props.user_name);
      if (index !== -1) followers.splice(index, 1);

      const newFollowing = {
        followings: followings
      };

      const newFollower = {
        followers: followers
      };
      
      this.props.followProfile(this.props.user_id, profile.id, newFollowing, newFollower);
    }
  };

  render() {
    const { profile } = this.props.profile;

    const userAccess = (
      profile ? (
        <UpdateModal
          age={profile.age}
          location={profile.location}
          learning={profile.learning}
          native={profile.native}
          about={profile.about}
          onUpdate={this.onUpdate}
        />
      ) : null
    );

    const guestAccess = (
      profile ? (!profile.followers.includes(this.props.user_name) ? (
        <Button color='dark' onClick={this.onFollow} block>
          Follow
        </Button>
        ) : (
        <Button color='dark' onClick={this.onUnfollow} block>
          Unfollow
        </Button>
      )) : null
    );

    return(
      <Card>
        <CardImg top width="100%" src="https://semantic-ui.com/images/avatar2/large/kristy.png" alt="Card image cap" />
        {this.props.isUser ? (this.props.isProfile ? userAccess : null) : guestAccess}
        <CardBody>
          <CardTitle style={{ margin: 0 }}>
            <h5 style={{ margin: 0 }}>{profile ? profile.name : null}</h5>
          </CardTitle>
          <CardText>
            <small className='text-muted'>Joined in {profile ? profile.date : null}</small>
          </CardText>
          {profile ? profile.about.split('\n').map((string, key) => {
            return <CardText key={key}>{string}</CardText>;
          }) : null}
        </CardBody>
        <CardFooter style={{ backgroundColor: 'white' }}>
          <Person />{profile ? profile.followings.length : null} Following
        </CardFooter>
      </Card>
    );
  }
}

ProfileCard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfile, clearProfile, updateProfile, followProfile }
)(ProfileCard);
