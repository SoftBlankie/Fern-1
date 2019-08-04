import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import MoreVert from '@material-ui/icons/MoreVert';

class ResponseEdit extends Component {
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
      <Card>
        <CardBody>
          <Row>
            <Col md='10' xs='10'>
              <CardTitle>{this.props.name}</CardTitle>
            </Col>
            <Col md='2' xs='2'>
              <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle tag='span'>
                  <MoreVert />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.props.onUpdate(this.props.edit_id)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={this.props.onDelete.bind(this, this.props.edit_id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          <CardText>{this.props.edit}</CardText>
          <CardText>
            <small className="text-muted">{this.props.date}</small>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ResponseEdit;
