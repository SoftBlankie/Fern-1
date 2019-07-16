import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getUserPosts } from '../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '@material-ui/icons/Comment';
import Edit from '@material-ui/icons/Create';

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
                      <ListGroup>
                        <TransitionGroup className="userPosts">
                          {userPosts.map(({ id, name, title, date, language, comments, edits }) => (
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
