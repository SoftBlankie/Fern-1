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
import LocationSuggest from './LocationSuggest';
import LanguageSuggest from './LanguageSuggest';

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

  onLocation = value => {
    this.setState({ location: value });
  };
  
  onLearning = value => {
    this.setState({ learning: value });
  };

  onNative = value => {
    this.setState({ native: value });
  };

  onClick = () => {
    const { age, location, learning, native } = this.state;

    this.props.onUpdate(age, location, learning, native);
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
                <LocationSuggest 
                  onLocation={this.onLocation}
                />
              </FormGroup>
              <FormGroup>
                <Label for='learning'>Learning</Label>
                <LanguageSuggest
                  onLanguage={this.onLearning}
                />
              </FormGroup>
              <FormGroup>
                <Label for='native'>Native</Label>
                <LanguageSuggest
                  onLanguage={this.onNative}
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
