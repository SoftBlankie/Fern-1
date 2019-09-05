import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
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
    if (isAuthenticated) this.props.history.push(user.name)
  };

  render() {
    return(
      <div>
        <Container style={{ marginTop: '2rem', marginBottom: '1rem' }}>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <Card>
                <CardHeader>About</CardHeader>
                <CardBody>
                  <b>Purpose</b>
                  <CardText>
                    Fern-1 is a language-hub accessible to all language learners determined to apply their skills through writing posts. At Fern-1, members may assist one another in learning their preferred language through edits in a more study-focused environment that caters towards their interests.
                  </CardText>
                  <b>Features</b>
                  <ul>
                    <li>Simple User Interface</li>
                    <li>Academic-oriented Community</li>
                    <li>Web and Mobile Support</li>
                  </ul>
                  <b>Who I am</b>
                  <CardText>
                    Hi there! My name is <a href='https://softblankie.github.io/' target='blank'>Derick</a>, the developer for this website. I'm a college student that was inspired from language learning sites such as Lang-8, HelloTalk, etc and wished to make a community where we're all focused in an academic environment that seemed to be lacking within other sites.
                  </CardText>
                  <CardText>
                    Everything built within this site might seem unconventional, but to me, it's more of a reflection of my decisions and values. Please enjoy and don't hesitate to contact me for further details.
                  </CardText>
                </CardBody>
                <CardFooter>
                  <b>Credit</b>
                  <CardText>Avatar Profile: Semantic UI Avatars</CardText>
                </CardFooter>
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
