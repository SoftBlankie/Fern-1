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
    const { id, name, title, language, comments, edits } = this.props;
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const date = new Date(this.props.date).toLocaleDateString('en-US', options);

    return(
      <Card tag={Link} to={`/${name}/post/${id}`} style={{ color: 'black' }}>
        <CardBody>
          <CardTitle style={{ margin: 0 }}>
            <span>{name}</span>
            <b style={{ marginLeft: '1rem' }}>{title}</b>
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
