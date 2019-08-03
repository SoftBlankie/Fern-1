import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText
} from 'reactstrap';

class ResponseEdit extends Component {
  render() {
    return(
      <Card>
        <CardBody>
          <CardTitle>{this.props.name}</CardTitle>
          <CardSubtitle>{this.props.date}</CardSubtitle>
          <CardText>{this.props.edit}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ResponseEdit;
