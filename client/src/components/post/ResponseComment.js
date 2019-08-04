import React, { Component } from 'react';
import {
  Row,
  Col,
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
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return(
      <ListGroupItem>
        <Row>
          <Col md='auto' xs='auto'>
            <ListGroupItemHeading>{this.props.name}</ListGroupItemHeading>
          </Col>
          <Col>
            {this.props.date}
          </Col>
          <Col className='text-md-right' md='1' xs='2'>
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
              <DropdownToggle tag='span'>
                <MoreVert />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        {this.props.comment}
      </ListGroupItem>
    );
  }
}

export default ResponseComment;
