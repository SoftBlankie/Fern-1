import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { Button, Toolbar } from './component'

import Bold from '@material-ui/icons/FormatBold';
import Italic from '@material-ui/icons/FormatItalic';
import Underline from '@material-ui/icons/FormatUnderlined';
import Strikethrough from '@material-ui/icons/StrikethroughS';

import LooksOne from '@material-ui/icons/LooksOne';
import LooksTwo from '@material-ui/icons/LooksTwo';
import Numbered from '@material-ui/icons/FormatListNumbered';
import Bulleted from '@material-ui/icons/FormatListBulleted';

const DEFAULT_NODE = 'paragraph';

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: '',
          },
        ],
      },
    ],
  },
})

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'x', type: 'strikethrough' }),
  MarkHotkey({ key: 'u', type: 'underline' }),
]

function MarkHotkey(options) {
  const { type, key } = options;

  return {
    onKeyDown(e, editor, next) {
      if (!e.ctrlKey || e.key !== key) return next();
      e.preventDefault();
      editor.toggleMark(type);
    },
  }
}

class TextEditor extends Component {
  state = {
    value: this.props.initialValue ? this.props.initialValue : initialValue
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

  onChange = ({ value }) => {
    this.setState({ value });
    this.props.onChange({value});
  }

  onClickMark = (event, type) => {
    event.preventDefault();
    this.editor.toggleMark(type);
  }

  onClickBlock = (event, type) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        editor.setBlocks('list-item').wrapBlock(type);
      }
    }
  }

  render() {
    return (
      <Fragment>
        <Toolbar>
          {this.renderMarkButton('bold')}
          {this.renderMarkButton('italic')}
          {this.renderMarkButton('underline')}
          {this.renderMarkButton('strikethrough')}
          {this.renderBlockButton('heading-one')}
          {this.renderBlockButton('heading-two')}
          {this.renderBlockButton('numbered-list')}
          {this.renderBlockButton('bulleted-list')}
        </Toolbar>
        <Editor
          plugins={plugins}
          ref={this.ref}
          placeholder={'Enter an entry'}
          value={this.state.value}
          onChange={this.onChange}
					renderBlock={this.renderBlock}
          renderMark={this.renderMark}
        />
      </Fragment>
    );
  }

  renderMarkButton = (type) => {
    const isActive = this.hasMark(type);
    var icon;

    if (type === 'bold') {
      icon = <Bold />;
    } else if (type === 'italic') {
      icon = <Italic />;
    } else if (type === 'underline') {
      icon = <Underline />;
    } else if (type === 'strikethrough') {
      icon = <Strikethrough />;
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        {icon}
      </Button>
    )
  }

  renderBlockButton = (type) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.state;

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
      }
    }

    var icon;

    if (type === 'heading-one') {
      icon = <LooksOne />;
    } else if (type === 'heading-two') {
      icon = <LooksTwo />;
    } else if (type === 'numbered-list') {
      icon = <Numbered />;
    } else if (type === 'bulleted-list') {
      icon = <Bulleted />;
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        {icon}
      </Button>
    )
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  }

  renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong>{props.children}</strong>;
      case 'italic':
        return <em>{props.children}</em>;
      case 'strikethrough':
        return <del>{props.children}</del>;
      case 'underline':
        return <u>{props.children}</u>;
      default:
        return next();
    }
  }
}

export default TextEditor;
