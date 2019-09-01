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
    native: '',
    about: ''
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ age: nextProps.age });
    this.setState({ location: nextProps.location });
    this.setState({ learning: nextProps.learning });
    this.setState({ native: nextProps.native });
    this.setState({ about: nextProps.about });
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
    const { age, location, learning, native, about } = this.state;
    if (age === '') this.setState({ age: 0 });

    this.props.onUpdate(age, location, learning, native, about);
    this.toggle();
  };

  onCancel = () => {
    this.setState({ age: this.props.age });
    this.setState({ location: this.props.location });
    this.setState({ learning: this.props.learning });
    this.setState({ native: this.props.native });
    this.setState({ about: this.props.about });
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
                  value={this.state.age}
                  className='mb-3'
                  onChange={this.onChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='location'>Location</Label>
                <LocationSuggest
                  value={this.state.location}
                  onLocation={this.onLocation}
                />
              </FormGroup>
              <FormGroup>
                <Label for='learning'>Learning</Label>
                <LanguageSuggest
                  value={this.state.learning}
                  onLanguage={this.onLearning}
                />
              </FormGroup>
              <FormGroup>
                <Label for='native'>Native</Label>
                <LanguageSuggest
                  value={this.state.native}
                  onLanguage={this.onNative}
                />
              </FormGroup>
              <FormGroup>
                <Label for='about'>About</Label>
                <Input
                  type='textarea'
                  name='about'
                  id='about'
                  placeholder='about'
                  value={this.state.about}
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
              color='secondary'
              onClick={this.onCancel.bind(this)}
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
