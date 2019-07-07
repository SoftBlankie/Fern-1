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
import { addPost } from '../actions/postActions';
import PropTypes from 'prop-types';
import TextEditor from './editor/editor';

class Post extends Component {
  state = {
    user_id: '',
    title: '',
    entry: '',
    language: ''
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onEdit = ({ value }) => {
    this.setState({ entry: value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newPost = {
      user_id: this.state.user_id,
      title: this.state.title,
      entry: this.state.entry,
      language: this.state.language
    };

    this.props.addPost(newPost);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    
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
)(Post);
