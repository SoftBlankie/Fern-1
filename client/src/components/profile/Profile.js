import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
import { getUserPosts } from '../../actions/postActions';
import {
  getProfileByName,
  clearProfile,
  updateProfile
} from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from './ProfileCard';
import Post from '../home/Post';

class Profile extends Component {
  state = {
    activeTab: '1'
  };

  componentDidMount() {
    const { user } = this.props.auth;

    if (user) {
      const userPosts = {
        name: this.props.match.params.name
      };
      this.props.getUserPosts(userPosts);
      this.props.getProfileByName(this.props.match.params.name);
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

  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { userPosts } = this.props.post;
    const { profile } = this.props.profile;
    const isUser = (user ? user.name : '') === this.props.match.params.name;

    if (!isAuthenticated)
      return <Redirect to='/' />

    return (
      <div>
        {profile ? (
          <Container>
            <Row>
              <Col md='3'>
                <ProfileCard
                  isUser={isUser}
                  isProfile={true}
                  user_id={user.id}
                  user_name={user.name}
                  user_followings={profile.followings}
                />
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
                          <ListGroupItem>Age: {profile.age !== 0 ? profile.age : null}</ListGroupItem>
                          <ListGroupItem>Location: {profile.location}</ListGroupItem>
                          <ListGroupItem>Learning: {profile.learning}</ListGroupItem>
                          <ListGroupItem>Native: {profile.native}</ListGroupItem>
                          <ListGroupItem>Posts: {userPosts.length}</ListGroupItem>
                          <ListGroupItem>Following: {profile.followings.length}</ListGroupItem>
                          <ListGroupItem>Followers: {profile.followers.length}</ListGroupItem>
                          <ListGroupItem>Date Created: {profile.date}</ListGroupItem>
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
