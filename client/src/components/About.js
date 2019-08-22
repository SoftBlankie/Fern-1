import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardText
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class About extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated)
      this.props.history.push(user.name)
  };

  render() {
    return(
      <div>
        <Container style={{ marginTop: '2rem' }}>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Card>
                <CardHeader>About</CardHeader>
                <CardBody>
                  <CardText>
                    Fern is a language-hub accessible to all language learners determined to
                    write long blocks of text. Here, members may assist one another in learning
                    their preferred language in a more study-focused environment that caters
                    to their interests.
                  </CardText>
                </CardBody>
              </Card>        
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(About);
