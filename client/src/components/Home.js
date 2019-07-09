import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
  Jumbotron,
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
    const { isAuthenticated } = this.props.auth;
    const { posts } = this.props.post;

    const landingPage = (
      <Fragment>
        <Container fluid className="centered">
          <Row>
            <Col>
              <Jumbotron>
                <h1 className="display-3">Fern</h1>
                <p className="lead">Accelerate foreign learning!</p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );

    const homePage = (
      <Fragment>
        <Container>
          <Row>
            <Col xs="3">
              <Button
                color='dark'
                style={{ marginBottom: '2rem' }}
                tag={Link} to="/postform"
              >
                Add Post
              </Button>
            </Col>
            <Col xs="9">
              <ListGroup>
                <TransitionGroup className="posts">
                  {posts.map(({ id, title }) => (
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
        </Container>
      </Fragment>
    );

    return (
      <div>
        {isAuthenticated ? homePage : landingPage}
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
