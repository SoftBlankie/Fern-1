import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getEdits,
  clearEdits,
  addEdit,
  updateEdit,
  deleteEdit
} from '../../../actions/editActions';
import { updatePost } from '../../../actions/postActions';

import RequestEdit from './RequestEdit';
import EditBar from './EditBar';
import GuestEditor from '../../editor/GuestEditor';

class Edit extends Component {
  state = {
    isEdit: false,
    isAnnotate: false,
    selection: '',
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

  requestEdit = selection => {
    let { requestEdit } = this.state;

    if (this.state.isEdit) return;

    requestEdit.push(
      <RequestEdit key={this.props.post_id}
        name={this.props.name}
        selection={selection}
        onAddEdit={this.onAddEdit}
        onCancelEdit={this.onCancelEdit}
      />
    );
    this.setState({ requestEdit });
    this.toggle();
  };

  onAddEdit = (selection, edit) => {
    const newEdit = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
      selection: selection,
      edit: edit
    };

    const newPost = {
      edits: this.props.post_edits+1,
      date: 'current'
    };

    this.props.addEdit(this.props.post_id, newEdit);
    this.props.updatePost(this.props.post_id, newPost);
    this.setState({ requestEdit: [] });
    this.toggle();
  };

  onCancelEdit = () => {
    this.setState({ requestEdit: [] });
    this.toggle();
  };

  getSelectionClick = selection => {
    if (this.state.selection === selection) {
      // if selection stays the same
      //this.setState({ isAnnotate: !this.state.isAnnotate });
    } else if (!this.state.isAnnotate) {
      this.setState({ selection: selection });
      this.setState({ isAnnotate: !this.state.isAnnotate });
    } else {
      this.setState({ selection: selection });
    }
  };

  clearSelectionClick = () => {
    this.setState({ selection: '' });
  };

  onUpdate = (edit_id, edit) => {
    const newEdit = {
      edit: edit
    };

    this.props.updateEdit(this.props.post_id, edit_id, newEdit);
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
          getSelectionClick={this.getSelectionClick}
          clearSelectionClick={this.clearSelectionClick}
          onUpdate={this.onUpdate}
          onDelete={this.onDelete}
        />
        <GuestEditor
          initialValue={this.props.post_entry}
          post_id={this.props.post_id}
          isAnnotate={this.state.isAnnotate}
          selection={this.state.selection}
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
