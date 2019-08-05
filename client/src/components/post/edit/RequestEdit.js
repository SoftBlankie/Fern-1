import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';

class RequestEdit extends Component {
  state = {
    edit: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.edit) return;
    this.props.onAddEdit(this.state.edit);
    this.props.toggle();
  };

  onCancel = () => {
    this.props.toggle();
  };

  render() {
    return(
      <Card>
        <CardBody>
          <CardTitle>{this.props.name}</CardTitle>
          <Row>
            <Col>
              <Input
                type='textarea'
                name='edit'
                id='edit'
                value={this.state.edit}
                placeholder='Edit'
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
                Edit
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
        </CardBody>
      </Card>
    );
  }
}

export default RequestEdit;
