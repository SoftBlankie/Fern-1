import React, { Component } from 'react';
import {

} from 'reactstrap';

class EditDrawer extends Component {
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
    this.toggle();
  };

  render() {
    const edits = this.state.edits.map(editCard => { return editCard });

    return (
      {edits}
    );
  }
}
