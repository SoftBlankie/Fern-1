import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button
} from 'reactstrap';

class CommentForm extends Component {
  state = {
    comment: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.comment) return;
    this.props.onComment(this.state.comment);
    this.setState({ comment: ''});
  };

  render() {
    return(
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Row>
            <Col>
              <Input
                type='textarea'
                name='comment'
                id='comment'
                value={this.state.comment}
                placeholder='Comment'
                onChange={this.onChange}
                style={{ marginTop: '1rem' }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                color='dark'
                size='sm'
                style={{ marginTop: '1rem', marginBottom: '1rem' }} block
              >
                Comment
              </Button>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    );
  }
}

export default CommentForm;
