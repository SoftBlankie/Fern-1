import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardFooter
} from 'reactstrap';
import Comment from '@material-ui/icons/Comment';
import Edit from '@material-ui/icons/Edit';

class ResponsePost extends Component {
  render() {
    const { id, name, title, language, date, comments, edits } = this.props;

    return(
      <Card tag={Link} to={`/${name}/post/${id}`} style={{ color: 'black' }}>
        <CardBody>
          <CardTitle style={{ margin: 0 }}>
            <span>{name}</span>
            <span style={{ marginLeft: '1rem' }}>{title}</span>
            <span className='float-right'>{language}</span>
          </CardTitle>
          <CardText>
            <small className='text-muted'>{date}</small>
          </CardText>
        </CardBody>
        <CardFooter style={{ backgroundColor: 'white' }}>
          <Comment /><span>{comments}</span>
          <Edit style={{ marginLeft: '1rem' }} /><span>{edits}</span>
        </CardFooter>
      </Card>
    );
  }
}

export default ResponsePost;
