import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import ResponsePost from './ResponsePost';

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
            {posts.slice(currentPage*pageSize, (currentPage+1)*pageSize).map(({ id, name, title,  date, language, comments, edits }) => (
              <div key={id} style={{ marginBottom: '1rem' }}>
                <ResponsePost
                  id={id}
                  name={name}
                  title={title}
                  date={date}
                  language={language}
                  comments={comments}
                  edits={edits}
                />
              </div>
            ))}
          </Col>
        </Row>
        <Row>
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
