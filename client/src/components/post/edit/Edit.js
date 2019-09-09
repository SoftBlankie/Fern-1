import React, { Component, Fragment } from 'react';
import {
  getEdits,
  clearEdits,
  addEdit,
  updateEdit,
  agreeEdit,
  deleteEdit,
  reportEdit
} from '../../../actions/editActions';
import { updatePost } from '../../../actions/postActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EditBar from './EditBar';
import GuestEditor from '../../editor/GuestEditor';

class Edit extends Component {
  componentDidMount() {
    this.props.getEdits(this.props.post_id);
  };

  componentWillUnmount() {
    this.props.clearEdits();
  };

  onAddEdit = (edit, isComplete) => {
    const newEdit = {
      user_id: this.props.user_id,
      post_id: this.props.post_id,
      edit: edit,
      isComplete: isComplete
    };

    const newPost = {
      edits: this.props.post_edits+1,
      date: 'current'
    };

    this.props.addEdit(this.props.post_id, newEdit);
    this.props.updatePost(this.props.post_id, newPost);
  };

  onUpdate = (edit_id, edit, isComplete) => {
    const newEdit = {
      edit: edit,
      isComplete: isComplete
    };

    this.props.updateEdit(this.props.post_id, edit_id, newEdit);
  };

  onAgree = (edit_id, agrees) => {
    agrees.push(this.props.user_name);

    const newEdit = {
      agrees: agrees,
      date: 'current'
    };

    this.props.agreeEdit(this.props.post_id, edit_id, newEdit);
  };

  onUnagree = (edit_id, agrees) => {
    const index = agrees.indexOf(this.props.user_name);
    if (index !== -1) agrees.splice(index, 1);

    const newEdit = {
      agrees: agrees,
      date: 'current'
    };

    this.props.agreeEdit(this.props.post_id, edit_id, newEdit);
  };

  onDelete = edit_id => {
    const newPost = {
      edits: this.props.post_edits-1,
      date: 'current'
    };

    this.props.deleteEdit(this.props.post_id, edit_id);
    this.props.updatePost(this.props.post_id, newPost);
  };

  onReport = (edit_id, reports) => {
    // check if already reported
    const index = reports.indexOf(this.props.user_name);
    if (index !== -1) {
      return;
    } else {
      // if 3 reports, delete edit
      if (reports.length === 2) {
        this.onDelete(edit_id);
        return;
      }
      reports.push(this.props.user_name);

      const newEdit = {
        reports: reports,
        date: 'current'
      };

      this.props.reportEdit(this.props.post_id, edit_id, newEdit);
    }
  };

  render() {
    const { edits } = this.props.edit;

    return(
      <Fragment>
        <EditBar
          user_name={this.props.user_name}
          isUser={this.props.isUser}
          edits={edits}
          onUpdate={this.onUpdate}
          onAgree={this.onAgree}
          onUnagree={this.onUnagree}
          onDelete={this.onDelete}
          onReport={this.onReport}
        />
        <GuestEditor
          post_id={this.props.post_id}
          initialValue={this.props.post_entry}
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
  { getEdits, clearEdits, addEdit, updateEdit, agreeEdit, deleteEdit, reportEdit, updatePost }
)(Edit);
