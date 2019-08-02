import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import ListIcon from '@material-ui/icons/List';

class EditBar extends Component {
  state = {
    isOpen: window.innerWidth > 1080 ? true : false,
    edits: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ edits: nextProps.edits });  
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const edits = this.state.edits.map(editCard => { return editCard });

    const userStyle = {
      margin: 0,
      top: 'auto',
      right: 50,
      bottom: 120,
      left: 'auto',
      position: 'fixed',
      zIndex: 99,
    };

    const guestStyle = {
      margin: 0,
      top: 'auto',
      right: 50,
      bottom: 50,
      left: 'auto',
      position: 'fixed',
      zIndex: 99,
    };

    return (
      <Fragment>
        {window.innerWidth <= 1080 ? <Fab
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
          <Container style={{ 
            overflow: 'auto',
            width: 350,
            marginTop: 70,
            marginRight: 50 }}
          >
            <Row>
              <Col>
                <h3>Edits</h3>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col>
                {edits}
              </Col>
            </Row>
          </Container>
        </Drawer>
      </Fragment>
    );
  }
}

export default EditBar;
