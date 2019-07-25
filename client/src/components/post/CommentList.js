import React, { Component } from 'react';
import axios from 'axios';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class CommentList extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    axios.get(`/api/posts/${this.props.post_id}/comments`)
      .then(res => {
        this.setState({
          comments: res.data
        });
      });
  };

  render() {
    const {comments} = this.state;

    return(
      <ListGroup>
        <TransitionGroup className='comments'>
          {comments.map(({ id, name, comment }) => (
            <CSSTransition key={id} timeout={500} classNames='fade'>
              <ListGroupItem>
                <ListGroupItemHeading>{name}</ListGroupItemHeading>
                {comment}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
  }
}

export default CommentList;
