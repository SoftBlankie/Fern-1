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
                      This site supports users learning languages through writing. Please be respectful and courteous.
                    </CardText>
                    <b>FAQ</b>
                    <hr />
                    <div>
                      <CardText>
                        Help! I don't know what to write.
                      </CardText>
                      <div>
                        Some ideas are listed below
                        <ul>
                          <li>Thoughts</li>
                          <li>Daily Events</li>
                          <li>Interests</li>
                        </ul>
                      </div>
                    </div>
                    <hr />
                    <div>
                      <CardText>
                        Why focus on writing long texts?
                      </CardText>
                      <CardText>
                        Due to personal beliefs, engaging in longer writing structures challenges our minds to continuously think in the language that we hope to learn. Rather than thinking of short lines, we build upon what has been stated.
                      </CardText>
                    </div>
                    <hr />
                    <div>
                      <CardText>
                        Why can I only choose 1 languague I am learning? What if I have multiple 
                        interests?
                      </CardText>
                      <CardText>
                        The profile page is meant to showcase to others what we are most interested in learning. Rather than displaying multiple interests, this allows for easier communication between other users.
                      </CardText>
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
