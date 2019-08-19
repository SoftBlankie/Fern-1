import React, { Component } from 'react';
import classnames from 'classnames';
import {
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  TabContent,
  TabPane,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FollowCard extends Component {
  state = {
    activeTab: '1',
    list: []
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  render() {
    const { profile } = this.props.profile;

    return(
      <div>
        <Card>
          <CardBody>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  href='#'
                  onClick={() => { this.toggle('1'); }}
                >
                  Following
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  href='#'
                  onClick={() => { this.toggle('2'); }}
                >
                  Follower
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              activeTab={this.state.activeTab}
              style={{ height: '200px', overflowY: 'auto' }}
            >
              <TabPane tabId='1'>
                <ListGroup>
                  {profile ? profile.followings.map((name, id) => (
                    <ListGroupItem key={id}>{name}</ListGroupItem>
                  )) : null}
                </ListGroup>
              </TabPane>
              <TabPane tabId='2'>
                <ListGroup>
                  {profile ? profile.followers.map((name, id) => (
                    <ListGroupItem key={id}>{name}</ListGroupItem>
                  )) : null}
                </ListGroup>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    );
  }
}

FollowCard.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  null
)(FollowCard);
