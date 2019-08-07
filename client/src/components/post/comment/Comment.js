import React, { Component } from 'react';
import {
  Container,
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
} from '../../../actions/commentActions';
import { updatePost } from '../../../actions/postActions';

import CommentForm from './CommentForm';
import ResponseComment from './ResponseComment';

// implement lazy loading
class Comment extends Component {
  componentDidMount() {
    this.props.getComments(this.props.post_id);
  };

  componentWillUnmount() {
    this.props.clearComments();
  };

  onComment = comment => {
    const newComment = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
      comment: comment
    };

    const newPost = {
      comments: this.props.post_comments+1,
      date: 'current'
    };

    this.props.addComment(this.props.post_id, newComment);
    this.props.updatePost(this.props.post_id, newPost);
  };

  onUpdate = (comment_id, comment) => {
    const newComment = {
      comment: comment
    };

    this.props.updateComment(this.props.post_id, comment_id, newComment);
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
      <Container>
        <CommentForm onComment={this.onComment}/>
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
      </Container>
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
