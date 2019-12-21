import React, { Component } from 'react';
import Html from 'slate-html-serializer';
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  Input,
  Form,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GuestEditor from '../../editor/GuestEditor';
import { rules } from '../../editor/rules';

const html = new Html({ rules });

class EditPage extends Component {
  state = {
    isEdit: this.props.isEdit ? true : false,

    title_error: false,
    isComplete_error: false,

    title: '',
    isComplete: false,
    edit: this.props.initialEntry ? this.props.initialEntry : ''
  };

  componentDidUpdate() {
    const { isAuthenticated, user } = this.props.auth;
    const { posts } = this.props.post;
    const { edits } = this.props.edits;
    if (isAuthenticated === false) {
      this.props.history.push('/');
    } else if (isAuthenticated) {
      if ((!posts.find(post => post.id === Number(this.props.match.params.post_id)))) {
        this.props.history.push(`/${user.name}`);
      } else if ((!edits.find(edit => edit.id === Number(this.props.match.params.edit_id)))) {
        this.props.history.push(`/${user.name}`);
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.name+'_error']: false });
  };

  onEdit = ({ value }) => {
    this.setState({ edit: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const { posts } = this.props.post;
    const post = posts.find(post => post.id === Number(this.props.match.params.id));

    if (this.props.match.params.edit_id) {
      const newEdit = {
        edit: html.serialize(this.state.edit),
        isComplete: this.state.isComplete
      };

      this.props.updateEdit(post.id, newEdit);
    } else {
      const newEdit = {
        user_id: user.id,
        post_id: post.id,
        edit: html.serialize(this.state.edit),
        isComplete: this.state.isComplete
      };

      const newPost = {
        edits: post.edits+1,
        date: 'current'
      };
      
      this.props.addEdit(post.id, newEdit);
      this.props.updatePost(post.id, newPost);
    }
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
                    <Label for ='title'>Edit</Label>
                    <Input
                      type='text'
                      name='title'
                      id='edit'
                      invalid={this.state.title_error}
                      placeholder='Title'
                      defaultValue={this.state.title}
                      onChange={this.onChange}
                      style={{ marginBottom: '2rem' }}
                    />
                    <Label for ='edit'>Edit</Label>
                    <div
                      name='edit'
                      id='edit'
                      style={{ marginBottom: '2rem' }}
                    >
                      <GuestEditor
                        initialValue={this.state.entry}
                        onChange={this.onEdit}
                      />
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
                      Confirm
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

EditPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  edit: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  edit: state.edit,
});

export default connect(
  mapStateToProps,
  null
)(EditPage);
