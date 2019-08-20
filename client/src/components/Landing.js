import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  Form,
  FormGroup,
  Alert,
  Label,
  Button,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class Landing extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password
    };

    this.props.register(newUser);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    if (isAuthenticated)
      return <Redirect to={`/${user.name}`}/>

    return( 
        <Jumbotron style={{ marginTop: '3rem' }}>
          <Container>
          <Row>
            <Col>
              <Card>
                <CardImg src='' />
              </Card>
            </Col>
            <Col md={{ size: 5, offset: 1 }}>
              <Card>
                <CardHeader style={{ border: 0, backgroundColor: 'white' }}>
                  <h1>Fern</h1>
                </CardHeader>
                <CardBody>
                  {this.state.msg ? (
                    <Alert color='danger'>{this.state.msg}</Alert>
                  ) : null}
                  <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                      <Label for='name'>Public Name</Label>
                      <Input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='name'
                        className='mb-3'
                        onChange={this.onChange}
                      />
                      <Label for='email'>Email</Label>
                      <Input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                        className='mb-3'
                        onChange={this.onChange}
                      />
                      <Label for='password'>Password</Label>
                      <Input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Password'
                        className='mb-3'
                        onChange={this.onChange}
                      />
                      <Button color='dark' style={{ marginTop: '2rem' }} block>
                        Register
                      </Button>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Container>
        </Jumbotron>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(Landing);
