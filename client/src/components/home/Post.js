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

import Comment from '@material-ui/icons/Comment';
import Edit from '@material-ui/icons/Edit';

class Post extends Component {
  state = {
    currentPage: 0,
    pageSize: 20,
    maxPageCount: 10,
    pageCount: 0
  };

  componentWillReceiveProps(nextProps) {
    const pageCount = Math.ceil(nextProps.posts.length/this.state.pageSize);

    this.setState({
      pageCount: pageCount
    });
  };

  onClick = index => {
    let { pagination } = this.state;

    this.setState({
      currentPage: index,
      pagination: pagination
    });
  };

  getPagination = () => {
    const { currentPage, pageCount } = this.state;
    var startPage = (currentPage < 5) ? 0 : currentPage - 5;
    var endPage = 10 + startPage;
    endPage = (pageCount < endPage) ? pageCount : endPage;
    var diff = startPage - endPage + 10;
    startPage -= (startPage - diff > 0) ? diff : 0;

    return [...Array(pageCount).keys()].slice(startPage, endPage);
  };

  render() {
    const { currentPage, pageSize, pageCount } = this.state;
    const posts  = this.props.posts;

    return(
      <Container>
        <Row>
          <Col>
            <ListGroup>
              {posts.slice(currentPage*pageSize, (currentPage+1)*pageSize).map(({ id, name, title, date, language, comments, edits }) => (
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
              ))}
            </ListGroup>
          </Col>
        </Row>
        <Row style={{ marginTop: '1rem' }}>
          <Col>
            <Pagination>
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink first onClick={this.onClick.bind(this, 0)} href='' />
              </PaginationItem>
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink previous onClick={this.onClick.bind(this, currentPage-1)} href='' />
              </PaginationItem>
              {this.getPagination().map((page, id) => 
                <PaginationItem active={page === currentPage} key={id}>
                  <PaginationLink onClick={this.onClick.bind(this, page)} href=''>
                    {page+1}
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Post;
