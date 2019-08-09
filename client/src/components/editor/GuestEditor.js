import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { css } from 'emotion';
import { Editor } from 'slate-react';
import { Button, Menu } from './component';

import Edit from '@material-ui/icons/Edit';

// might want to add versions for precision edits
// add selection finder and annotation
class GuestEditor extends Component {
  state = {
    selection: '',
    value: this.props.initialValue
  }

  ref = editor => {
    this.editor = editor
  }

  menuRef = React.createRef()

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  EditButton = () => {
    return (
      <Button
        reversed
        onMouseDown={e => {
          e.preventDefault()
          this.props.requestEdit(this.state.selection);
        }}
      >
        <Edit />
      </Button>
    )
  }

  HoverMenu = React.forwardRef(({ editor }, ref) => {
    const root = window.document.getElementById('root')
    return ReactDOM.createPortal(
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        <this.EditButton />
      </Menu>,
      root
    )
  })

  updateMenu = () => {
    const menu = this.menuRef.current
    if (!menu) return

    const { value } = this.state
    const { fragment, selection } = value

    if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
      menu.removeAttribute('style')
      return
    }

    const native = window.getSelection()
    const range = native.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    menu.style.opacity = 1
    menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`

    menu.style.left = `${rect.left +
      window.pageXOffset -
      menu.offsetWidth / 2 +
      rect.width / 2}px`
  }

	hasMark = type => {
		const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

	hasBlock = type => {
  	const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  onChange = ({ value }) => {
    if (value.document.text !== this.state.value.document.text) {
      this.setState({ value: this.props.initialValue });
      return;
    }
    this.setState({ selection: 'placeholder'});
    this.setState({ value });
  }

  render() {
    return (
      <Editor
        ref={this.ref}
        value={this.state.value}
        onChange={this.onChange}
        renderEditor={this.renderEditor}
        renderAnnotation={this.renderAnnotation}
        renderBlock={this.renderBlock}
        renderMark={this.renderMark}
      />
    );
  }

  renderEditor = (props, editor, next) => {
    const children = next()
    return (
      <Fragment>
        {children}
        <this.HoverMenu ref={this.menuRef} editor={editor} />
      </Fragment>
    )
  }

  renderAnnotation = (props, editor, next) => {
    const { children, annotation, attributes } = props

    switch (annotation.type) {
      case 'highlight':
        return (
          <span {...attributes} style={{ backgroundColor: '#ffeeba' }}>
            {children}
          </span>
        )
      default:
        return next()
    }
  }

  renderBlock = (props, editor, next) => {
    const { attributes, children, node } = props

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
        return next()
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
        return next()
    }
  }
}

export default GuestEditor;
