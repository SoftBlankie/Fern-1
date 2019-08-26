import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import languages from '../languages';
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts, getFollowingsPosts, getLanguagePosts } from '../../actions/postActions';

import Post from './Post';
import ProfileCard from '../profile/ProfileCard';

import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

class Home extends Component {
  state = {
    dropdownLabel: 'Default',
    dropdownOpen: false
  };
  
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.getPosts();
  };

  componentDidUpdate() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated === false) {
      this.props.history.push('/');
    } else if (user) {
      if (user.name !== this.props.match.params.name) {
        this.props.history.push(user.name)
      }
    }
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onGetPosts = () => {
    this.setState({ dropdownLabel: 'Default' });
    this.props.getPosts();
  };

  onGetFollowingsPosts = () => {
    const followings = { followings: this.props.profile.profile.followings };

    this.setState({ dropdownLabel: 'Followings' });
    this.props.getFollowingsPosts(followings);
  };
  
  onGetLanguagePosts = language => {
    this.setState({ dropdownLabel: language });
    this.props.getLanguagePosts(language);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;

    const addStyle = {
      margin: 0,
      top: 'auto',
      right: 50,
      bottom: 50,
      left: 'auto',
      position: 'fixed',
      zIndex: 99,
    };

    return (
      <div>
        {isAuthenticated ? (
          <div>
            <Fab
              size="large"
              component={Link} to={`/${user.name}/postform`}
              style={addStyle}
            >
              <Add />
            </Fab>
            <Container>
              <Row>
                {window.innerWidth > 760 ? (
                  <Col md='3'>
                    <ProfileCard
                      user_id={user.id}
                      isUser={true}
                      isProfile={false}
                      name={user.name}
                      date={user.date}
                    />
                    <div style={{ marginBottom: '1rem' }}></div>
                  </Col>
                ) : null}
                <Col md='9'>
                  <Dropdown 
                    className='list-unstyled'
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                    nav 
                  >
                    <DropdownToggle nav caret>{this.state.dropdownLabel}</DropdownToggle>
                    <DropdownMenu
                      modifiers={{
                        setMaxHeight: {
                          enabled: true,
                          order: 890,
                          fn: (data) => {
                            return {
                              ...data,
                              styles: {
                                ...data.styles,
                                overflow: 'auto',
                                maxHeight: 200,
                              },
                            };
                          },
                        },
                      }}
                    >
                      <DropdownItem onClick={this.onGetPosts.bind(this)}>
                        Default
                      </DropdownItem>
                      <DropdownItem onClick={this.onGetFollowingsPosts.bind(this)}>
                        Following
                      </DropdownItem>
                      <DropdownItem divider />
                      {languages.map((language, id) => (
                        <DropdownItem
                          key={id}
                          onClick={this.onGetLanguagePosts.bind(this, language)}
                        >
                          {language}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  <Post posts={posts}/>
                </Col>
              </Row>
            </Container>
          </div>
        ) : null}
      </div>
    );
  }
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getFollowingsPosts: PropTypes.func.isRequired,
  getLanguagePosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, getFollowingsPosts, getLanguagePosts }
)(Home);
