import React, { Component } from 'react';
import {
  Label,
  Input,
  Button,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

class UpdateModal extends Component {
  state = {
    isOpen: false,
    age: '',
    location: '',
    learning: '',
    native: ''
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.props.updatePost();
    this.toggle();
  };

  render() {
    return(
      <div>
        <Button color='dark' onClick={this.toggle} block>
          Edit
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for='age'>Age</Label>
                <Input
                  type='text'
                  name='age'
                  id='age'
                  placeholder='age'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='location'>Location</Label>
                <Input
                  type='text'
                  name='location'
                  id='location'
                  placeholder='location'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='learning'>Learning</Label>
                <Input
                  type='text'
                  name='learning'
                  id='learning'
                  placeholder='learning'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='native'>Native</Label>
                <Input
                  type='text'
                  name='native'
                  id='native'
                  placeholder='native'
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={this.onClick.bind(this)}
            >
              Update
            </Button>
            <Button
              color='seconday'
              onClick={this.toggle}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateModal;
