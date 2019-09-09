import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { Editor } from 'slate-react';
import Edit from '@material-ui/icons/Edit';

class GuestEditor extends Component {
  state = {
    value: this.props.initialValue
  }

  ref = editor => {
    this.editor = editor;
  }

	hasMark = type => {
		const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  }

	hasBlock = type => {
  	const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  }

  render() {
    return (
      <Fragment>
        <Editor
          ref={this.ref}
          value={this.state.value}
          renderEditor={this.renderEditor}
          renderBlock={this.renderBlock}
          renderMark={this.renderMark}
          readOnly
        />
      </Fragment>
    );
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next();
    }
  }

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>
      case 'italic':
        return <em>{props.children}</em>
      case 'strikethrough':
        return <del>{props.children}</del>
      case 'underline':
        return <u>{props.children}</u>
      default:
        return next();
    }
  }
}

export default GuestEditor;
