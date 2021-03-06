import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Tooltip
} from 'reactstrap';
import ResponseEdit from './ResponseEdit';

import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import ListIcon from '@material-ui/icons/List';
import InfoIcon from '@material-ui/icons/Info';

class EditBar extends Component {
  state = {
    isOpen: window.innerWidth > 1080 ? true : false,
    tooltipOpen: false,
    edits: [],
    requestEdit: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ edits: nextProps.edits });  
    this.setState({ requestEdit: nextProps.requestEdit });
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  toggleTooltip = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  };

  render() {
    const { edits } = this.state;
    const requestEdit = this.state.requestEdit.map(editCard => { return editCard });

    const userStyle = window.innerWidth > 760 ? {
      margin: 0,
      top: 'auto',
      right: 50,
      bottom: 120,
      left: 'auto',
      position: 'fixed',
      zIndex: 99,
    } : {
      margin: 0,
      top: 'auto',
      right: 25,
      bottom: 100,
      left: 'auto',
      position: 'fixed',
      zIndex: 99,
    };

    const guestStyle = window.innerWidth > 760 ? {
      margin: 0,
      top: 'auto',
      right: 50,
      bottom: 50,
      left: 'auto',
      position: 'fixed',
      zIndex: 99,
    } : {
      margin: 0,
      top: 'auto',
      right: 25,
      bottom: 25,
      left: 'auto',
      position: 'fixed',
      zIndex: 99,
    };

    return (
      <Fragment>
        {window.innerWidth <= 760 ? <Fab
          size='large'
          onClick={this.toggle}
          style={ this.props.isUser ? userStyle : guestStyle }
        >
          <ListIcon />
        </Fab> : null}
        <Drawer
          variant='persistent'
          anchor ='right'
          open={this.state.isOpen}
          style={{ position: 'fixed', zIndex: 2 }}
        >
          <Container style={ window.innerWidth > 760 ? { 
            overflow: 'auto',
            width: 350,
            marginTop: 70,
            marginRight: 50
          } : {
            overflow: 'auto',
            width: 350,
            marginTop: 70
          }}
          >
            <Row>
              <Col md='10' xs='10'>
                <h3>
                  <span
                    onClick={this.props.clearSelectionClick}
                    style={{ cursor: 'pointer' }}
                  >
                    Edits
                  </span>
                </h3>
              </Col>
              <Col md='2' xs='2'>
                <InfoIcon id='info'/>
                <Tooltip
                  placement='auto'
                  isOpen={this.state.tooltipOpen}
                  target='info'
                  toggle={this.toggleTooltip}
                  style={{ textAlign: 'left' }}
                  modifiers={{offset:{offset: '-200px', enabled: true}}}
                >
                  <p>- Select text and click on 'pencil' icon to edit</p>
                  <p>- Click card text to show edit annotation</p>
                  <p>- Click 'Edits' header to clear annotation</p>
                </Tooltip>
              </Col>
            </Row>
            <hr style={{ marginTop: 0 }}/>
            <Row>
              <Col>
                {this.props.isEdit ? requestEdit : null}
                {edits ? edits.map(({ id, name, selection, edit, agrees, reports, date }) => (
                  <Container key={id} style={{ marginBottom: '1rem' }}>
                    <Row>
                      <Col>
                        <ResponseEdit
                          user_name={this.props.user_name}
                          edit_id={id}
                          name={name}
                          selection={selection}
                          edit={edit}
                          agrees={agrees}
                          reports={reports}
                          date={date}
                          getSelectionClick={this.props.getSelectionClick}
                          onUpdate={this.props.onUpdate}
                          onAgree={this.props.onAgree}
                          onUnagree={this.props.onUnagree}
                          onDelete={this.props.onDelete}
                          onReport={this.props.onReport}
                        />
                      </Col>
                    </Row>
                  </Container>
                )) : null}
              </Col>
            </Row>
          </Container>
        </Drawer>
      </Fragment>
    );
  }
}

export default EditBar;
