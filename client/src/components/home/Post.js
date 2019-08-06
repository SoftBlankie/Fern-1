import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Comment from '@material-ui/icons/Comment';
import Edit from '@material-ui/icons/Edit';

class Post extends Component {
  state = {
    currentPage: 0,
    pageSize: 20,
    pageCount: 0
  };

  componentWillReceiveProps(nextProps) {
    const pageCount = Math.ceil(nextProps.posts.length/this.state.pageSize);

    this.setState({
      pageCount: pageCount
    });
  };

  onClick = index => {
    this.setState({
      currentPage: index
    });
  };

  render() {
    const { currentPage, pageSize, pageCount } = this.state;
    const posts  = this.props.posts;

    return(
      <div>
        <ListGroup>
          <TransitionGroup className="posts">
            {posts.slice(currentPage*pageSize, (currentPage+1)*pageSize).map(({ id, name, title, date, language, comments, edits }) => (
              <CSSTransition key={id} timeout={100} classNames="fade">
                <ListGroupItem key={id} tag={Link} to={`/${name}/post/${id}`}>
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
        <Pagination className='text-center'>
          <PaginationItem disabled={currentPage <= 0}>
            <PaginationLink first onClick={this.onClick.bind(this, 0)} href='' />
          </PaginationItem>
          <PaginationItem disabled={currentPage <= 0}>
            <PaginationLink previous onClick={this.onClick.bind(this, currentPage-1)} href='' />
          </PaginationItem>
          {[...Array(pageCount)].map((page, id) => 
            <PaginationItem active={id === currentPage} key={id}>
              <PaginationLink onClick={this.onClick.bind(this, id)} href=''>
                {id+1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem disabled={currentPage >= pageCount-1}>
            <PaginationLink next onClick={this.onClick.bind(this, currentPage+1)} href='' />
          </PaginationItem>
          <PaginationItem disabled={currentPage >= pageCount-1}>
            <PaginationLink last onClick={this.onClick.bind(this, pageCount-1)} href='' />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

export default Post;
