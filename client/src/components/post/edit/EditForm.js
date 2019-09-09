import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  Form,
  Card,
  CardBody
} from 'reactstrap';
import TextEditor from '../editor/TextEditor';

class EditPage extends Component {
  state = {
    isComplete_error: false,
    edit: this.props.initialEntry ? this.props.initialEntry : ''
  };

  onChange = () => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name+'_error']: false });
  };

  onEdit = ({ value }) => {
    this.setState({ edit: value });
  };

  onSubmit = () => {
    e.preventDefault();

    // create new edit route
  };

  render() {
    return(
      <div>
        <Container style={{ marginBottom: '1rem' }}>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    <Label for ='edit'>Edit</Label>
                    <div
                      name='edit'
                      id='edit'
                      style={{ marginBottom: '2rem' }}
                    >
                      <TextEditor initialValue={this.state.entry} onChange={this.onEdit} />
                    </div>
                    <Label for='isComplete'>Done editing?</Label>
                    <Input
                      type='select'
                      name='isComplete'
                      invalid={this.state.isComplete_error}
                      onChange={this.onChange}
                    >
                      <option>Select</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Input>
                    <Button color='dark' style={{ marginTop: '2rem' }} block>
                      Add Edit
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default EditPage;
