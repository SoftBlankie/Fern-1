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
  TabPane,
  Button
} from 'reactstrap';
import { getUserPosts } from '../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from './home/Post';

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
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { userPosts } = this.props.post;

    const guestAccess = (
      <Button color='dark' style={{ marginBottom: '2rem' }} block>
        Follow
      </Button>
    );

    if (!isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <h1>{this.props.match.params.name}</h1>
              {user.name === this.props.match.params.name ? !guestAccess : guestAccess}
              <Nav tabs>
                <NavItem>
                  <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  href="#"
                  onClick={() => { this.toggle('1'); }}
                  >
                    Activity
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
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getUserPosts }
)(Profile);
