import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Editor } from 'slate-react';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Html from 'slate-html-serializer';
import { rules } from './rules';

const html = new Html({ rules })

class Post extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { posts } = this.props.post;
    const post = posts.find(post => Number(post.id) === Number(this.props.match.params.id));

    if (!isAuthenticated)
      return <Redirect to='/'/>

    return (
      <div>
        <Container>
          <h1>{post.title}</h1>
          <Editor
            defaultValue={html.deserialize(post.entry)}
            renderBlock={this.renderNode}
            renderMark={this.renderMark}
            readOnly />
        </Container>
      </div>
    );
  }

  renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return (
          <pre {...props.attributes}>
            <code>{props.children}</code>
          </pre>
        )
      case 'paragraph':
        return (
          <p {...props.attributes} className={props.node.data.get('className')}>
            {props.children}
          </p>
        )
      case 'quote':
        return <blockquote {...props.attributes}>{props.children}</blockquote>
      case 'heading-one':
        return <h1 {...props.attributes}>{props.children}</h1>
      case 'heading-two':
        return <h2 {...props.attributes}>{props.children}</h2>
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
