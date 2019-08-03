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
          post_id={this.props.post_id}
          post_edits={this.props.post_edits}
          toggle={this.toggle}
        />
      );
    this.setState({ requestEdit });
    this.toggle();
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
