import React, { Component } from 'react';
import Html from 'slate-html-serializer';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import TextEditor from '../editor/TextEditor';
import { rules } from './rules';

const html = new Html({ rules })

class PostForm extends Component {
  state = {
		title_error: false,
		entry_error: false,
		language_error: false,

    title: this.props.initialTitle ? this.props.initialTitle : '',
    entry: this.props.initialEntry ? this.props.initialEntry : '',
    language: this.props.initialLanguage ? this.props.initialLanguage : 'Select'
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

		if (!this.state.title || !this.state.entry || (this.state.language === 'Select'))
			return false;
		return true;
	};

  onSubmit = e => {
    e.preventDefault();

    if (this.props.postId) {
      if (this.isValid()) {
        const newPost = {
          title: this.state.title,
          entry: html.serialize(this.state.entry),
          language: this.state.language
        };

        this.props.updatePost(this.props.postId, newPost);
        // timeout to allow redux to load
        setTimeout(function() {this.props.toggle();}.bind(this),100);
      }
    } else {
      if (this.isValid()) {
        const newPost = {
          user_id: this.props.auth.user.id,
          title: this.state.title,
          entry: html.serialize(this.state.entry),
          language: this.state.language
        };
        
        this.props.addPost(newPost);
        this.props.history.push('/');
      }
    }
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    
    if (!isAuthenticated)
      return <Redirect to='/'/>

    const addButton = (
      <Button color='dark' style={{ marginTop: '2rem' }} block>
        Add Post
      </Button>
    );

    const editButton = (
      <Button color='dark' style={{ marginTop: '2rem' }} block>
        Edit Post
      </Button>
    );

    return(
      <div>
        <Container>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type='text'
                    name='title'
                    id='post'
                    invalid={this.state.title_error}
                    placeholder='Title'
                    defaultValue={this.state.title}
                    onChange={this.onChange}
                    style={{ marginBottom: '2rem' }}
                  />
                  <Label for="entry">Entry</Label>
                  <div
                    name='entry'
                    id='post'
                    style={{ marginBottom: '2rem' }}
                  >
                    <TextEditor initialValue={this.state.entry} onChange={this.onEdit} />
                  </div>
                  <Label for="language">Language</Label>
                  <Input
                    type="select"
                    name="language"
                    invalid={this.state.language_error}
                    defaultValue={this.state.language}
                    onChange={this.onChange}
                  >
                    {/* placeholder: Replace with compact list of all available langauges*/}
                    <option>Select</option>
                    <option>Japanese</option>
                  </Input>
                  {this.props.postId ? editButton : addButton}
                </FormGroup>
              </Form>
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
  { addPost, updatePost }
)(PostForm);
