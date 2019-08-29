import React, { Component } from 'react';
import classnames from 'classnames';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  TabContent,
  TabPane
} from 'reactstrap';
import {
  getProfileByName,
  clearProfile,
  updateProfile
} from '../../actions/profileActions';
import { getUserPosts } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from './ProfileCard';
import Post from '../home/Post';

class Profile extends Component {
  state = {
    activeTab: '1'
  };
  
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidMount() {
    const userPosts = {
      name: this.props.match.params.name
    };
    this.props.getUserPosts(userPosts);
   
    if (!this.props.profile.profile ||
      (this.props.match.params.name !== this.props.auth.user.name)) {
      this.props.getProfileByName(this.props.match.params.name);
    }
  };

  componentDidUpdate() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;
    if (isAuthenticated === false) {
      this.props.history.push('/');
    } else if (isAuthenticated) {
      if (!profile)
        this.props.history.push(`/${user.name}`);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      const userPosts = {
        name: nextProps.match.params.name
      };
      this.props.getUserPosts(userPosts);
      this.props.getProfileByName(nextProps.match.params.name);
      this.setState({ activeTab: '1' });
    }
  };
  
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { user } = this.props.auth;
    const { userPosts } = this.props.post;
    const { profile } = this.props.profile;
    const isUser = (user ? user.name : '') === this.props.match.params.name;

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = profile ? new Date(profile.date).toLocaleDateString('en-US', options) : '';

    return (
      <div>
        {profile ? (
          <Container>
            <Row>
              <Col md='3'>
                {(profile && user) ? (
                  <ProfileCard
                    isUser={isUser}
                    isProfile={true}
                    user_id={user.id}
                    user_name={user.name}
                    user_followings={profile.followings}
                  />
                ) : null}
                {window.innerWidth <= 760 ? <hr /> : null}
              </Col>
              <Col md='9'>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    href="#"
                    onClick={() => { this.toggle('1'); }}
                    >
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      href="#"
                      onClick={() => { this.toggle('2'); }}
                    >
                      Posts
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col>
                        <ListGroup>
                          <ListGroupItem>Public Name: {profile.name}</ListGroupItem>
                          <ListGroupItem>
                            Age: {profile.age !== 0 ? profile.age : null}
                          </ListGroupItem>
                          <ListGroupItem>Location: {profile.location}</ListGroupItem>
                          <ListGroupItem>Learning: {profile.learning}</ListGroupItem>
                          <ListGroupItem>Native: {profile.native}</ListGroupItem>
                          <ListGroupItem>Posts: {userPosts.length}</ListGroupItem>
                          <ListGroupItem>Following: {profile.followings.length}</ListGroupItem>
                          <ListGroupItem>Followers: {profile.followers.length}</ListGroupItem>
                          <ListGroupItem>Date Created: {date}</ListGroupItem>
                        </ListGroup>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <Post posts={userPosts}/>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
    );
  }
}

Profile.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  getProfileByName: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserPosts, getProfileByName, clearProfile, updateProfile }
)(Profile);
