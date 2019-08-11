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
  TabContent,
  TabPane
} from 'reactstrap';
import { getUserPosts } from '../../actions/postActions';
import { getProfile, clearProfile, updateProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileCard from './ProfileCard';
import Post from '../home/Post';

// card props need to encompass other user profiles
// onEdit and onFollow needs to be made
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      const userPosts = {
        name: nextProps.match.params.name
      };
      this.props.getUserPosts(userPosts);
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

  onUpdate = (age, location, learning, native) => {
    const newProfile = {
      age: age,
      location: location,
      learning: learning,
      native: native
    };

    this.props.updateProfile(newProfile);
  };

  onFollow = () => {

  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { userPosts } = this.props.post;
    const isUser = (user ? user.name : '') === this.props.match.params.name;

    if (!isAuthenticated) return <Redirect to='/'/>

    return (
      <div>
        <Container>
          <Row>
            <Col md='3'>
              <ProfileCard
                isUser={isUser}
                isProfile={true}
                name={user.name}
                date={user.date}
                onUpdate={this.onUpdate}
                onFollow={this.onFollow}
              />
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
      </div>
    );
  }
}

Profile.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getUserPosts, getProfile, clearProfile, updateProfile }
)(Profile);
