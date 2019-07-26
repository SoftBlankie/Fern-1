import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import languages from '../languages';
import {
  Row,
  Col,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { getPosts } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Post from './Post';

import Fab from '@material-ui/core/Fab';
import Add from "@material-ui/icons/Add";

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

    if (!isAuthenticated)
      return <Redirect to='/'/>

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
            <Col>
              <Dropdown className="list-unstyled" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                  Filter
                </DropdownToggle>
                <DropdownMenu>
                  {languages.map((language, id) => (
                    <DropdownItem key={id}>{language}</DropdownItem>
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
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Home);
