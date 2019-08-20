import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

class FollowModal extends Component {
  state = {
    isOpen: false,
    activeTab: '1'
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  onClick = name => {
    this.toggle();
    this.props.history.push(`/${name}/profile`);
  };

  render() {
    return(
      <span>
        <span onClick={this.toggle} style={{ cursor: 'pointer' }}>
          {this.props.followings.length} Following
        </span>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} style={{ width: '400px' }}>
          <ModalHeader toggle={this.toggle} style={{ borderBottom: 0, paddingBottom: 0 }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  href='#'
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Following
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  href='#'
                  onClick={() => { this.toggleTab('2'); }}
                >
                  Follower
                </NavLink>
              </NavItem>
            </Nav>
          </ModalHeader>
          <ModalBody>
            <TabContent
              activeTab={this.state.activeTab}
              style={{ height: '500px', overflowY: 'auto' }}
            >
              <TabPane tabId='1'>
                <ListGroup>
                  {this.props.followings.map((name, id) => (
                    <ListGroupItem key={id}>
                      <span
                        onClick={this.onClick.bind(this, name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {name}
                      </span>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </TabPane>
              <TabPane tabId='2'>
                <ListGroup>
                  {this.props.followers.map((name, id) => (
                    <ListGroupItem key={id}>
                      <span
                        onClick={this.onClick.bind(this, name)}
                        style={{ cursor: 'pointer' }}
                      >
                        {name}
                      </span>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </TabPane>
            </TabContent>
          </ModalBody>
        </Modal>
      </span>
    );
  }
}

export default withRouter(FollowModal);
