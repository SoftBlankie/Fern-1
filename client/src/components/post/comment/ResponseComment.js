import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  ListGroupItem,
  ListGroupItemHeading,
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

	// new props not loading
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
    return(
      <ListGroupItem>
        <Row>
          <Col md='auto' xs='auto'>
            <ListGroupItemHeading>{this.props.name}</ListGroupItemHeading>
          </Col>
          <Col>
            <small className='text-muted'>{this.props.date}</small>
          </Col>
          <Col className='text-md-right' md='1' xs='2'>
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
              <DropdownToggle tag='span'>
                <MoreVert />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.toggleReadOnly}>
                  Edit
                </DropdownItem>
                <DropdownItem onClick={this.props.onDelete.bind(this, this.props.comment_id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        {this.state.readOnly ? this.props.comment :
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
