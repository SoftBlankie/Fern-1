import React, { Component } from 'react';
import {
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardFooter
} from 'reactstrap';
import UpdateModal from './UpdateModal';
import Person from '@material-ui/icons/Person';

class ProfileCard extends Component {
  render() {
    const userAccess = (
      <UpdateModal
        onUpdate={this.props.onUpdate}
      />
    );

    const guestAccess = (
      <Button color='dark' onClick={this.props.onFollow} block>
        Follow
      </Button>
    );

    return(
      <Card>
        <CardImg top width="100%" src="https://semantic-ui.com/images/avatar2/large/kristy.png" alt="Card image cap" />
        {this.props.isUser ? (this.props.isProfile ? userAccess : null) : guestAccess}
        <CardBody>
          <CardTitle style={{ margin: 0 }}>
            <h5 style={{ margin: 0 }}>{this.props.name}</h5>
          </CardTitle>
          <CardText>
            <small className='text-muted'>Joined in {this.props.date}</small>
          </CardText>
          <CardText>
            {this.props.name} is learning Japanese.
          </CardText>
        </CardBody>
        <CardFooter style={{ backgroundColor: 'white' }}>
          <Person />{this.props.followings} Following
        </CardFooter>
      </Card>
    );
  }
}

export default ProfileCard;
