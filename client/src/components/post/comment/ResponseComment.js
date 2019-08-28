import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import MoreVert from '@material-ui/icons/MoreVert';

class ResponseComment extends Component {
  state = {
    isOpen: false,
    readOnly: true,
    comment: this.props.comment
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleReadOnly = () => {
    this.setState({
      readOnly: !this.state.readOnly
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    if (!this.state.comment) return;

    this.props.onUpdate(this.props.comment_id, this.state.comment);
    this.toggleReadOnly();
  };

  onCancel = () => {
    this.toggleReadOnly();
    this.setState({ comment: this.props.comment });
  };

  render() {
    const { user_name, comment_id, likes, reports } = this.props;
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const date = new Date(this.props.date).toLocaleDateString('en-US', options);

    return(
      <ListGroupItem>
        <Row>
          <Col md='auto' xs='auto'>
            <ListGroupItemHeading>
              <Link to={`/${this.props.name}/profile`}>{this.props.name}</Link>
            </ListGroupItemHeading>
          </Col>
          <Col>
            <small className='text-muted'>{date}</small>
          </Col>
          <Col className='text-md-right'>
            <small
              className={likes.includes(user_name) ? 'text-muted' : ''}
              onClick={likes.includes(user_name) ? 
                this.props.onUnlike.bind(this, comment_id, likes) :
                this.props.onLike.bind(this, comment_id, likes)}
              style={{ cursor: 'pointer' }}
            >
              {likes.length} Likes
            </small>
          </Col>
          <Col className='text-md-right' md='1' xs='2'>
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
              <DropdownToggle tag='span'>
                <MoreVert style={{ cursor: 'pointer' }}/>
              </DropdownToggle>
              {this.props.name === this.props.user_name ? (
                <DropdownMenu>
                  <DropdownItem onClick={this.toggleReadOnly}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={this.props.onDelete.bind(this, comment_id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu> 
              ) : (
                <DropdownMenu>
                  <DropdownItem onClick={this.props.onReport.bind(this, comment_id, reports)}>
                    Report
                  </DropdownItem>
                </DropdownMenu>
              )}
            </Dropdown>
          </Col>
        </Row>
        {this.state.readOnly ? 
          <ListGroupItemText>
            {this.props.comment}
          </ListGroupItemText> :
          <Container>
            <Row>
              <Col>
                <Input
                  type='textarea'
                  name='comment'
                  id='comment'
                  value={this.state.comment}
                  placeholder='Comment'
                  onChange={this.onChange}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '1rem' }}>
              <Col>
                <Button
                  color='dark'
                  size='sm'
                  onClick={this.onSubmit}
                  block
                >
                  Update
                </Button>
              </Col>
              <Col>
                <Button
                  size='sm'
                  onClick={this.onCancel}
                  block
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Container>
        }
      </ListGroupItem>
    );
  }
}

export default ResponseComment;
