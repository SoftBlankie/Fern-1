import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Container,
  Jumbotron,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated)
      return <Redirect to={`/${user.id}`}/>

    return( 
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
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Landing);
