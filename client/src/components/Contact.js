import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  Button,
  Alert,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Form,
  FormGroup
} from 'reactstrap';
import { sendMail } from '../actions/mailerActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Contact extends Component {
  state = {
    isAlert: false,
    message_error: false,
    message: ''
  };

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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name+'_error']: false });
  };

  isValid = () => {
    if (!this.state.message) this.setState({ message_error: true });

    if (!this.state.message)
      return false;
    return true;
  };

  showAlert = () => {
    this.setState({ isAlert: true });
    setTimeout(() => {
      this.setState({isAlert: false });
    }, 3000);
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.isValid()) {
      const mail = {
        email: this.props.auth.user.email,
        message: this.state.message
      };

      this.props.sendMail(mail);
      this.setState({ message: '' });
    }

    this.showAlert();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return(
      <div>
        {isAuthenticated ? (
          <Container style={{ marginBottom: '1rem' }}>
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
                <Alert color='primary' isOpen={this.state.isAlert}>
                  A message from {user.email} has been sent to fernmanager@gmail.com
                </Alert>
                <Card>
                  <CardHeader>Contact</CardHeader>
                  <CardBody>
                    <CardText>Feel free to message me about anything!</CardText>
                    <div>
                      <b>Examples</b>
                      <ul>
                        <li>Have a problem to report?</li>
                        <li>Have some feedback or improvement ideas?</li>
                        <li>Interested in adding a new language?</li>
                      </ul>
                    </div>
                    <Form onSubmit={this.onSubmit}>
                      <FormGroup>
                        <Label for='message'>Message</Label>
                        <Input
                          type='textarea'
                          name='message'
                          id='contact'
                          invalid={this.state.message_error}
                          placeholder='Message'
                          value={this.state.message}
                          onChange={this.onChange}
                          style={{ height: '100px' }}
                        />
                        <Button color='dark' style={{ marginTop: '2rem' }} block>
                          Send
                        </Button>
                      </FormGroup>
                    </Form>
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
  auth: state.auth,

});

export default connect(
  mapStateToProps,
  { sendMail }
)(Contact);
