import React from 'react';

const BLOCK_TAGS = {
  blockquote: 'quote',
  p: 'paragraph',
  pre: 'code',
  h1: 'heading-one',
  h2: 'heading-two',
}

const MARK_TAGS = {
  em: 'italic',
  strong: 'bold',
  u: 'underline',
}

export const rules = [
  // BLOCKS
  {
    deserialize(el, next) {
      const type = BLOCK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'block',
          type: type,
          data: {
            className: el.getAttribute('class'),
          },
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block') {
        switch (obj.type) {
          case 'code':
            return (
              <pre>
                <code>{children}</code>
              </pre>
            )
          case 'paragraph':
            return <p className={obj.data.get('className')}>{children}</p>
          case 'quote':
            return <blockquote>{children}</blockquote>
          case 'heading-one':
            return <h1>{children}</h1>
          case 'heading-two':
            return <h2>{children}</h2>
          default:
            return
        }
      }
    },
  },
  // MARKS
  {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()]
      if (type) {
        return {
          object: 'mark',
          type: type,
          nodes: next(el.childNodes),
        }
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        switch (obj.object) {
          case 'bold':
            return <strong>{children}</strong>
          case 'italic':
            return <em>{children}</em>
          case 'underline':
            return <u>{children}</u>
          default:
            return
        }
      }
    },
  },
]
