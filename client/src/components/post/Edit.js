import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEdits, clearEdits } from '../../actions/editActions';

import RequestEdit from './RequestEdit';
import EditBar from './EditBar';
import GuestEditor from '../editor/GuestEditor';

class Edit extends Component {
  state = {
    isEdit: false,
    edits: []
  };

  componentDidMount() {
    let { edits } = this.state;

    this.props.getEdits(this.props.post_id);
    this.props.edit.edits.map(edit => {
      edits.push(
        <span>Created</span>
      );
    });

    console.log(edits);
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
    let { edits } = this.state;

    if (this.state.isEdit) return;

    edits.push(
      <RequestEdit
        post_id={this.props.post_id}
        post_edits={this.props.post_edits}
        responseEdit={this.responseEdit}
      />
    );
    this.setState({ edits });
    this.toggle();
  };

  responseEdit = () => {
    let { edits } = this.state;

    edits.pop();
    edits.push(
      <span>Created new edit</span>
    );

    this.setState({ edits });
  };

  render() {
    return(
      <Fragment>
        <EditBar
          isUser={this.props.isUser}
          edits={this.state.edits}
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
  { getEdits, clearEdits }
)(Edit);
