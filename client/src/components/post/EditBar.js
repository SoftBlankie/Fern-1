import React, { Component } from 'react';

class EditBar extends Component {
  state = {
    edits: this.props.edits
  };

  render() {
    const edits = this.state.edits.map(editCard => { return editCard });

    return (
      <div>
        {edits}
      </div>
    );
  }
}

export default EditBar;
