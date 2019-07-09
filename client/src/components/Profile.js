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
  ListGroupItem
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getUserPosts } from '../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    if (user) {
      const userPosts = {
        user_id: user.id
      };

      this.props.getUserPosts(userPosts);
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { userPosts } = this.props.post;

    if (!isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        <Container>
          <Row>
            <Col xs="3">
              <h1>Profile</h1>
            </Col>
            <Col xs="9">
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
                          {userPosts.map(({ id, title }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                              <ListGroupItem tag={Link} to="/postform">
                                {title}
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
