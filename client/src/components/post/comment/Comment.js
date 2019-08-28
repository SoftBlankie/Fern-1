import React, { Component } from 'react';
import {
  Row,
  Col,
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
  likeComment,
  deleteComment,
  reportComment
} from '../../../actions/commentActions';
import { updatePost } from '../../../actions/postActions';

import CommentForm from './CommentForm';
import ResponseComment from './ResponseComment';

// create onReport
class Comment extends Component {
  state = {
    currentPage: 0,
    pageSize: 20,
    prevY: 0
  };

  componentDidMount() {
    this.props.getComments(this.props.post_id);

    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };
    this.observer = new IntersectionObserver(
      this.onObserver.bind(this),
      options
    );
    this.observer.observe(this.loadingRef);
  };

  componentWillUnmount() {
    this.props.clearComments();
    this.observer.disconnect();
  };

  onObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    if (this.state.prevY > y) {
      this.setState({ currentPage: this.state.currentPage+1 });
    }
    this.setState({ prevY: y });
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

  onLike = (comment_id, likes) => {
    likes.push(this.props.user_name);

    const newComment = {
      likes: likes,
      date: 'current'
    };

    this.props.likeComment(this.props.post_id, comment_id, newComment);
  };

  onUnlike = (comment_id, likes) => {
    const index = likes.indexOf(this.props.user_name);
    if (index !== -1) likes.splice(index, 1);

    const newComment = {
      likes: likes,
      date: 'current'
    };

    this.props.likeComment(this.props.post_id, comment_id, newComment);
  };

  onDelete = comment_id => {
    const newPost = {
      comments: this.props.post_comments-1,
      date: 'current'
    };

    this.props.deleteComment(this.props.post_id, comment_id);
    this.props.updatePost(this.props.post_id, newPost);
  };

  onReport = (comment_id, reports) => {
    // check if already reported
    const index = reports.indexOf(this.props.user_name);
    if (index !== -1) {
      return;
    } else {
      // if 3 reports, delete comment
      if (reports.length === 2) {
        this.onDelete(comment_id);
        return;
      }
      reports.push(this.props.user_name);

      const newComment = {
        reports: reports,
        date: 'current'
      };

      this.props.reportComment(this.props.post_id, comment_id, newComment);
    }
  };

  render() {
    const { comments } = this.props.comment;
    const { currentPage, pageSize } = this.state;

    return(
      <div>
        <CommentForm onComment={this.onComment}/>
        <Row>
          <Col>
            <ListGroup>
              <TransitionGroup className='comments'>
                {comments.slice(0, (currentPage+1)*pageSize).map(({ id, name, comment, likes, reports, date }) => (
                  <CSSTransition key={id} timeout={500} classNames='fade'>
                    <ResponseComment
                      user_name={this.props.user_name}
                      comment_id={id}
                      name={name}
                      comment={comment}
                      likes={likes}
                      reports={reports}
                      date={date}
                      onUpdate={this.onUpdate}
                      onLike={this.onLike}
                      onUnlike={this.onUnlike}
                      onDelete={this.onDelete}
                      onReport={this.onReport}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ListGroup>
          </Col>
        </Row>
        <div ref={loadingRef => (this.loadingRef = loadingRef)}></div>
      </div>
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
  { getComments, clearComments, addComment, updateComment, likeComment, deleteComment, reportComment, updatePost }
)(Comment);
