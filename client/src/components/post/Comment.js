import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  ListGroup
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getComments,
  clearComments,
  addComment,
  updateComment,
  deleteComment
} from '../../actions/commentActions';
import { updatePost } from '../../actions/postActions';

import ResponseComment from './ResponseComment';

class Comment extends Component {
  state = {
    comment: ''
  };

  componentDidMount() {
    this.props.getComments(this.props.post_id);
  };

  componentWillUnmount() {
    this.props.clearComments();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.comment) return;

    const newComment = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
      comment: this.state.comment
    };

    const newPost = {
      comments: this.props.post_comments+1,
      date: 'current'
    };

    this.props.addComment(this.props.post_id, newComment);
    this.props.updatePost(this.props.post_id, newPost);
    this.setState({ comment: '' });
  };

  onUpdate = comment_id => {
    // Open modal / make responseComment directly editable
  };

  onDelete = comment_id => {
    const newPost = {
      comments: this.props.post_comments-1,
      date: 'current'
    };

    this.props.deleteComment(this.props.post_id, comment_id);
    this.props.updatePost(this.props.post_id, newPost);
  };

  render() {
    const { comments } = this.props.comment;

    return(
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Row>
            <Col>
              <Input
                type='textarea'
                name='comment'
                id='comment'
                value={this.state.comment}
                placeholder='Comment'
                onChange={this.onChange}
                style={{ marginTop: '1rem' }}
               />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                color='dark'
                size='sm'
                style={{ marginTop: '1rem', marginBottom: '1rem' }} block
              >
                Comment
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup>
                <TransitionGroup className='comments'>
                  {comments.map(({ id, name, comment, date }) => (
                    <CSSTransition key={id} timeout={500} classNames='fade'>
                      <ResponseComment
                        comment_id={id}
                        name={name}
                        comment={comment}
                        date={date}
                        onUpdate={this.onUpdate}
                        onDelete={this.onDelete}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              </ListGroup>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

Comment.propTypes = {
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getComments, clearComments, addComment, updateComment, deleteComment, updatePost }
)(Comment);
