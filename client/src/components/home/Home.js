import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import { getPosts, getLanguagePosts } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from './Post';
import ProfileCard from '../profile/ProfileCard';

import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';

class Home extends Component {
  state = {
    dropdownOpen: false
  };

  componentDidMount() {
    this.props.getPosts();
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  filterLanguage = language => {
    this.props.getLanguagePosts(language);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;

    if (!isAuthenticated)
      return <Redirect to='/' />

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
              <Dropdown className='list-unstyled' nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                  Filter
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.props.getPosts.bind(this)}>
                    Default
                  </DropdownItem>
                  <DropdownItem onClick={this.props.getPosts.bind(this)}>
                    Following
                  </DropdownItem>
                  <DropdownItem divider />
                  {languages.map((language, id) => (
                    <DropdownItem
                      key={id}
                      onClick={this.filterLanguage.bind(this, language)}
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
    );
  }
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getLanguagePosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts, getLanguagePosts }
)(Home);
