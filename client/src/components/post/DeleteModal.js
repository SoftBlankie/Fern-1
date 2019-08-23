import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import Delete from '@material-ui/icons/Delete';

class DeleteModal extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onClick = () => {
    this.props.onDelete(this.props.post_id);
  };

  render() {
    return(
      <div>
        <Fab
          size='large'
          onClick={this.toggle}
          style={{
            margin: 0,
            top: 'auto',
            right: 50,
            bottom: 120,
            left: 'auto',
            position: 'fixed',
            zIndex: 99,
          }}
        >
          <Delete />
        </Fab>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete?</ModalBody>
          <ModalFooter>
            <Button
              color='primary'
              onClick={this.onClick.bind(this)}
            >
              Delete
            </Button>
            <Button
              color='secondary'
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

export default DeleteModal;
