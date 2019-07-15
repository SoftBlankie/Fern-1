import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Editor } from 'slate-react';
import {
  Container,
  Button,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Html from 'slate-html-serializer';
import { rules } from './rules';

const html = new Html({ rules })

class Post extends Component {
  state = {
    comment: ''
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { posts } = this.props.post;
    const post = posts.find(post => Number(post.id) === Number(this.props.match.params.id));

    if (!isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        {/* Increase side margins */}
        <Container>
          <h1>{post.title}</h1>
          <Editor
            defaultValue={html.deserialize(post.entry)}
            renderBlock={this.renderNode}
            renderMark={this.renderMark}
            readOnly />
          {/* When user click, transform editor to edit mode (same as postform) has additional delete post button */}
          {/* When guest click, transform editor where highlight adds edits */}
          <Button color='dark' style={{ marginTop: '2rem', marginBottom: '2rem' }} block>
            Edit
          </Button>
          {/* Change input to comment box */}
          <Input
            type='text'
            name='comment'
            id='comment'
            placeholder='Comment'
            onChange={this.onChange}
          />
          <Button color='dark' style={{ marginBottom: '2rem' }} block>
            Comment
          </Button>
        </Container>
      </div>
    );
  }

  renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'paragraph':
        return (
          <p {...props.attributes} className={props.node.data.get('className')}>
            {props.children}
          </p>
        )
      case 'heading-one':
        return <h1 {...props.attributes}>{props.children}</h1>
      case 'heading-two':
        return <h2 {...props.attributes}>{props.children}</h2>
      case 'numbered-list':
        return <ol {...props.attributes}>{props.children}</ol>
      case 'list-item':
        return <li {...props.attributes}>{props.children}</li>
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    const { mark, attributes } = props
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{props.children}</strong>
      case 'italic':
        return <em {...attributes}>{props.children}</em>
      case 'underline':
        return <u {...attributes}>{props.children}</u>
      default:
        return next()
    }
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  null
)(Post);
