import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import MoreVert from '@material-ui/icons/MoreVert';

class ResponseEdit extends Component {
  state = {
    isOpen: false,
    title: '',
    edit: this.props.edit
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { name, user_name, post_id, edit_id, agrees, reports } = this.props;
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const date = new Date(this.props.date).toLocaleDateString('en-US', options);

    return(
      <Card tag={Link} to={`/${name}/post/${post_id}/edit/${edit_id}`}>
        <CardBody>
          <Row>
            <Col md='10' xs='10'>
              <CardTitle>
                <Link to={`/${name}/profile`}>{name}</Link>
              </CardTitle>
            </Col>
            <Col md='2' xs='2'>
              <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle tag='span'>
                  <MoreVert style={{ cursor: 'pointer' }}/>
                </DropdownToggle>
                {name === user_name ? (
                  <DropdownMenu>
                    <DropdownItem onClick={this.toggleReadOnly}>
                      Edit
                    </DropdownItem>
                    <DropdownItem onClick={this.props.onDelete.bind(this, edit_id)}>
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownItem onClick={this.props.onReport.bind(this, edit_id, reports)}>
                      Report
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            </Col>
          </Row>
          <CardText>
            {this.state.title}
          </CardText>
          <Row>
            <Col md='auto' xs='auto'>
              <small className='text-muted'>{date}</small>
            </Col>
            <Col className='text-md-right'>
              <small
                className={agrees.includes(user_name) ? 'text-muted' : ''}
                onClick={agrees.includes(user_name) ?
                  this.props.onUnagree.bind(this, edit_id, agrees) :
                  this.props.onAgree.bind(this, edit_id, agrees)}
                style={{ cursor: 'pointer' }}
              >
                {agrees.length} Agrees
              </small>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

export default ResponseEdit;
