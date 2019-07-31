import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  CardBody,
  CardTitle
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePost } from '../../actions/postActions';
import { addEdit } from '../../actions/editActions';

class EditCard extends Component {
  state = {
    edit: ''
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.edit) return;

    const newEdit = {
      user_id: this.props.auth.user.id,
      post_id: this.props.post_id,
      edit: this.state.edit
    };

    const newPost = {
      edits: this.props.post_edits+1
    };

    this.props.addEdit(this.props.post_id, newEdit);
    this.props.updatePost(this.props.post_id, newPost);
    this.props.createEditList();
  }

  render() {
    const { user } = this.props.auth;

    return(
      <Card>
        <CardBody>
          <CardTitle>{user.name}</CardTitle>
          <Form onSubmit={this.onSubmit}>
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
                  block
                >
                  Edit
                </Button>
              </Col>
              <Col>
                <Button
                  size='sm'
                  block
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  edits: state.edit
});

export default connect(
  mapStateToProps,
  { addEdit, updatePost }
)(EditCard);
