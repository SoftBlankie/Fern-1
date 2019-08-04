import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getEdits,
  clearEdits,
  addEdit,
  updateEdit,
  deleteEdit
} from '../../actions/editActions';
import { updatePost } from '../../actions/postActions';

import RequestEdit from './RequestEdit';
import EditBar from './EditBar';
import GuestEditor from '../editor/GuestEditor';

class Edit extends Component {
  state = {
    isEdit: false,
    requestEdit: []
  };

  componentDidMount() {
    this.props.getEdits(this.props.post_id);
  };

  componentWillUnmount() {
    this.props.clearEdits();
  };

  toggle = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  requestEdit = () => {
    let { requestEdit } = this.state;

    if (this.state.isEdit) return;

    if (requestEdit.length === 0)
      requestEdit.push(
        <RequestEdit key={this.props.post_id}
          name={this.props.name}
          onAddEdit={this.onAddEdit}
          toggle={this.toggle}
        />
      );
    this.setState({ requestEdit });
    this.toggle();
  };

  onAddEdit = edit => {
    const newEdit = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
      edit: edit
    };

    const newPost = {
      edits: this.props.post_edits+1,
      date: 'current'
    };

    this.props.addEdit(this.props.post_id, newEdit);
    this.props.updatePost(this.props.post_id, newPost);
  };

  onUpdate = edit_id => {
    // make modal or directly edit
  };

  onDelete = edit_id => {
    const newPost = {
      edits: this.props.post_edits-1,
      date: 'current'
    };

    this.props.deleteEdit(this.props.post_id, edit_id);
    this.props.updatePost(this.props.post_id, newPost);
  };

  render() {
    const { edits } = this.props.edit;

    return(
      <Fragment>
        <EditBar
          isUser={this.props.isUser}
          isEdit={this.state.isEdit}
          edits={edits}
          requestEdit={this.state.requestEdit}
          onUpdate={this.onUpdate}
          onDelete={this.onDelete}
        />
        <GuestEditor
          initialValue={this.props.post_entry}
          post_id={this.props.post_id}
          requestEdit={this.requestEdit}
        />
      </Fragment>
    );
  }
}

Edit.propTypes = {
  getEdits: PropTypes.func.isRequired,
  edit: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  edit: state.edit
});

export default connect(
  mapStateToProps,
  { getEdits, clearEdits, addEdit, updateEdit, deleteEdit, updatePost }
)(Edit);
