import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Comment from '@material-ui/icons/Comment';
import Edit from '@material-ui/icons/Edit';

class Post extends Component {
  render() {
    const posts  = this.props.posts;

    return(
      <ListGroup>
        <TransitionGroup className="posts">
          {posts.map(({ id, name, title, date, language, comments, edits }) => (
            <CSSTransition key={id} timeout={500} classNames="fade">
              <ListGroupItem tag={Link} to={`/${name}/post/${id}`}>
                <ListGroupItemHeading>{title}</ListGroupItemHeading>
                <Container>
                  <Row>
                    <Col md="1" xs="2">
                      {name}
                    </Col>
                    <Col md="6" xs="4">
                      {date}
                    </Col>
                      <Col md="2" xs="3">
                    {language}
                    </Col>
                    <Col md="1" xs="1">
                      <Comment />{comments}
                    </Col>
                    <Col md="1" xs="1">
                      <Edit />{edits}
                    </Col>
                    </Row>
                </Container>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
  }
}

export default Post;
