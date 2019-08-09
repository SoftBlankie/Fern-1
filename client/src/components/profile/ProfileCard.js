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

import Person from '@material-ui/icons/Person';

class ProfileCard extends Component {
  render() {
    const guestAccess = (
      <Button color='dark' block>
        Follow
      </Button>
    );

    return(
      <Card>
        <CardImg top width="100%" src="https://semantic-ui.com/images/avatar2/large/kristy.png" alt="Card image cap" />
        {this.props.isUser ? !guestAccess : guestAccess}
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
          <Person />
        </CardFooter>
      </Card>
    );
  }
}

export default ProfileCard;