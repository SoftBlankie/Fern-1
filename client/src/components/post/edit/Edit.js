import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
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

import TextEditorRead from '../../editor/TextEditorRead';

class Edit extends Component {
  state = {
    edit: ''
  };

  componentDidMount() {
    this.props.getEdits(this.props.post_id);
  };

  componentWillUnmount() {
    this.props.clearEdits();
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
      <Container>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h1>TITLE</h1>
              </CardHeader>
              <CardBody>
                <TextEditorRead
                  initialValue={this.state.edit}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
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
