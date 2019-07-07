import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Editor } from 'slate-react';
import { Value } from 'slate';
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

const initialEntry = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.',
          },
        ],
      },
    ],
  },
})

function BoldMark(props) {
  return <strong>{props.children}</strong>
}

function ItalicMark(props) {
  return <i>{props.children}</i>
}

class Post extends Component {
  state = {
    user_id: '',
    title: '',
    entry: initialEntry,
    language: ''
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

	onEdit = ({ value }) => {
    this.setState({entry: value});
  };

  onKeyDown = (e, editor, next) => {
    if (!e.ctrlKey) return next();

    switch (e.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case 'b': {
        e.preventDefault();
        editor.toggleMark('bold');
        break;
      }
      case 'i': {
        e.preventDefault();
        editor.toggleMark('italic');
        break;
      }
      // Otherwise, let other plugins handle it.
      default: {
        return next();
      }
    }
  }

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
                  style={{ marginBottom: '2rem' }}
                  onChange={this.onChange}
                />
                <Label for="entry">Entry</Label>
								<Editor
									name='entry'
									value={this.state.entry}
									onChange={this.onEdit}
                  onKeyDown={this.onKeyDown}
                  renderMark={this.renderMark}
									style={{ marginBottom: '2rem' }}
								/>
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

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
      case 'italic':
        return <ItalicMark {...props} />
      default:
        return next()
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(Post);
