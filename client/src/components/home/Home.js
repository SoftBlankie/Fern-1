import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getPosts } from '../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import Add from "@material-ui/icons/Add";
import Comment from '@material-ui/icons/Comment';
import Edit from '@material-ui/icons/Create';

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
        <Container>
          <Row>
            <Col>
              <ListGroup>
              <Dropdown className="list-unstyled" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav caret>
                  Filter
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Japanese</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Fab
                size="large"
                component={Link} to={`/${user.name}/postform`}
                style={addStyle}
              >
                <Add />
              </Fab>
                <TransitionGroup className="posts">
                  {posts.map(({ id, name, title, date, language, comments, edits }) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                      <ListGroupItem tag={Link} to={`/${name}/post/${id}`}>
                        <ListGroupItemHeading>{title}</ListGroupItemHeading>
                        <Container>
                          <Row>
                            <Col xs="1">
                              {name}
                            </Col>
                            <Col xs="6">
                              {date}
                            </Col>
                            <Col xs="2">
                              {language}
                            </Col>
                            <Col xs="1">
                              <Comment />{comments}
                            </Col>
                            <Col xs="2">
                              <Edit />{edits}
                            </Col>
                          </Row>
                        </Container>
                      </ListGroupItem>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ListGroup>
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
