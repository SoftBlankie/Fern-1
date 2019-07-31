import React, { Component, Fragment } from 'react';
import RequestEdit from './RequestEdit';
import EditBar from './EditBar';
import GuestEditor from '../editor/GuestEditor';

import TestDrawer from './testDrawer';

class Edit extends Component {
  state = {
    isEdit: false,
    edits: []
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
        <EditBar edits={this.state.edits}/>
        <TestDrawer />
        <GuestEditor
          initialValue={this.props.post_entry}
          post_id={this.props.post_id}
          requestEdit={this.requestEdit}
        />
      </Fragment>
    );
  }
}

export default Edit;
