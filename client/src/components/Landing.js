import React, { Component } from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Alert,
  Label,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
	CardText,
  CardImg,
  Form,
  FormGroup
} from 'reactstrap';
import { login, register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Landing extends Component {
  state = {
		isLogin: true,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { isAuthenticated, user } = this.props.auth;
    if (isAuthenticated) this.props.history.push(user.name);

    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

	toggle = () => {
		this.setState({ name: '' });
		this.setState({ email: '' });
		this.setState({ password: '' });
		this.setState({ msg: null });
		this.setState({ isLogin: !this.state.isLogin });
	};

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

	onLogin = e => {
		e.preventDefault();
	
		const { email, password } = this.state;

		const user = {
			email,
			password
		};

		this.props.login(user);
	};

  onRegister = e => {
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
    const loginForm = (
      <Form onSubmit={this.onLogin}>
				<FormGroup>
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
						Login
					</Button>
				</FormGroup>
			</Form>
    );

    const registerForm = (
      <Form onSubmit={this.onRegister}>
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
    );

    return( 
      <Jumbotron style={{ marginTop: '2rem' }}>
        <Container>
          <Row>
            <Col md={{ size: 4, offset: 2 }}>
              <Card>
                <CardImg src='https://cdn.pixabay.com/photo/2016/03/11/12/51/fern-1250222_960_720.jpg' />
              </Card>
            </Col>
            <Col md={{ size: 4 }}>
              <Card style={{ marginTop: '1rem' }}>
                <CardHeader style={{ border: 0, backgroundColor: 'white' }}>
                  <h1 className='text-center'>Fern</h1>
                </CardHeader>
                {window.innerWidth > 760 ? (
                  <CardBody style={{ paddingTop: 0 }}>
                    {this.state.msg ? (
                      <Alert color='danger'>{this.state.msg}</Alert>
                    ) : null}
                    {this.state.isLogin ? loginForm : registerForm}
                  </CardBody>
                ) : null}
              </Card>
              {window.innerWidth > 760 ? (
                <Card style={{ marginTop: '1rem' }}>
                  <CardBody>
                    {this.state.isLogin ? (
                      <CardText className='text-center'>
                        <span className='text-muted'>Ready to get started? </span>
                        <span
                          onClick={this.toggle}
                          style={{ cursor: 'pointer', color: '#40a2ff' }}
                        >
                          Sign up
                        </span>
                      </CardText>
                    ) : (
                      <CardText className='text-center'>
                        <span className='text-muted'>Back to </span>
                        <span
                          onClick={this.toggle}
                          style={{ cursor: 'pointer', color: '#40a2ff' }}
                        >
                          Login
                        </span>
                      </CardText>
                    )}
                  </CardBody>
                </Card>
              ) : null}
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
  { login, register, clearErrors }
)(Landing);
