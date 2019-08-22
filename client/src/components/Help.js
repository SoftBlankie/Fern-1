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

class Help extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
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

  render() {
    const { isAuthenticated } = this.props.auth;

    return(
      <div>
        {isAuthenticated ? (
          <Container>
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
                <Card>
                  <CardHeader>Help</CardHeader>
                  <CardBody>
                    <b>Guidelines</b>
                    <CardText>
                      This site supports users learn languages through writing
                    </CardText>
                    <b>FAQ</b>
                    <div>
                      <CardText>Help! I don't know what to write</CardText>
                      <CardText></CardText>
                    </div>
                    <div>
                      <CardText>Why focus on writing long texts?</CardText>
                      <CardText></CardText>
                    </div>
                    <div>
                      <CardText>Why can I only choose 1 languague I am learning? What if I have multiple interests?</CardText>
                      <CardText></CardText>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        ) : null}
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
)(Help);
