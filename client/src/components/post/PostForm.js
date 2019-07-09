import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import TextEditor from '../editor/editor';

class PostForm extends Component {
  state = {
		title_error: false,
		entry_error: false,
		language_error: false,

    title: '',
    entry: '',
    language: 'Select'
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
		this.setState({ [e.target.name+'_error']: false });
  };

  onEdit = ({ value }) => {
    this.setState({ entry: value });
  };

	isValid = () => {
		if (!this.state.title) this.setState({ title_error: true });
		if (!this.state.entry) this.setState({ entry_error: true });
		if (this.state.language === 'Select') this.setState({ language_error: true });

		if (!this.state.title || !this.state.entry || (this.state.language_error) === 'Select')
			return false;
		return true;
	};

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      user_id: this.props.auth.user.id,
      title: this.state.title,
      entry: this.state.entry,
      language: this.state.language
    };
		
		if (this.isValid()) {
			this.props.addPost(newPost);
			this.props.history.push("/");
		}
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    
    if (!isAuthenticated)
      return <Redirect to='/'/>

    return(
      <div>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type='text'
                  name='title'
                  id='post'
                  invalid={this.state.title_error}
                  placeholder='Title'
                  onChange={this.onChange}
                  style={{ marginBottom: '2rem' }}
                />
                <Label for="entry">Entry</Label>
                <div
                  name='entry'
                  id='post'
									style={{ marginBottom: '2rem' }}
								>
                  <TextEditor onChange={this.onEdit} />
                </div>
                <Label for="language">Language</Label>
                <Input
									type="select"
									name="language"
                  invalid={this.state.language_error}
									onChange={this.onChange}
								>
                  {/* placeholder: Replace with compact list of all available langauges*/}
                  <option>Select</option>
                  <option>Japanese</option>
                </Input>
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Post
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
