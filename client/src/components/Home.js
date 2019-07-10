import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getPosts } from '../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Home extends Component {
  componentDidMount() {
    this.props.getPosts();
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;

    if (!isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        <Container>
          <Row>
            <Col xs="3">
              <Button
                color='dark'
                style={{ marginBottom: '2rem' }}
                tag={Link} to={`/${user.id}/postform`}
              >
                Add Post
              </Button>
            </Col>
            <Col xs="9">
              <ListGroup>
                <TransitionGroup className="posts">
                  {posts.map(({ id, title }) => (
                    <CSSTransition key={id} timeout={500} classNames="fade">
                      <ListGroupItem tag={Link} to={`/${user.id}/post/${id}`}>
                        {title}
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
