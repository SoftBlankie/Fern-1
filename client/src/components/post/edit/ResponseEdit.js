import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Input,
  Button,
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
    readOnly: true,
    edit: this.props.edit
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  toggleReadOnly = () => {
    this.setState({
      readOnly: !this.state.readOnly
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = () => {
    if (!this.state.edit) return;

    this.props.onUpdate(this.props.edit_id, this.state.edit);
    this.toggleReadOnly();
  };

  onCancel = () => {
    this.toggleReadOnly();
    this.setState({ edit: this.props.edit });
  };

  render() {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const date = new Date(this.props.date).toLocaleDateString('en-US', options);

    return(
      <Card>
        <CardBody>
          <Row>
            <Col md='10' xs='10'>
              <CardTitle>
                <Link to={`/${this.props.name}/profile`}>{this.props.name}</Link>
              </CardTitle>
            </Col>
            <Col md='2' xs='2'>
              <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle tag='span'>
                  <MoreVert style={{ cursor: 'pointer' }}/>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.toggleReadOnly}>
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={this.props.onDelete.bind(this, this.props.edit_id)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
          {this.state.readOnly ? (
            <CardText
              onClick={this.props.getSelectionClick.bind(this, this.props.selection)}
              style={{ cursor: 'pointer' }}
            >
              {this.props.edit}
            </CardText>
          ) : (
            <Container>
              <Row>
                <Col>
                  <Input
                    type='textarea'
                    name='edit'
                    id='edit'
                    value={this.state.edit}
                    placeholder='Edit'
                    onChange={this.onChange}
                  />
                </Col>
              </Row>
              <Row style ={{ marginTop: '1rem' }}>
                <Col>
                  <Button
                    color='dark'
                    size='sm'
                    onClick={this.onSubmit}
                    block
                  >
                    Update
                  </Button>
                </Col>
                <Col>
                  <Button
                    size='sm'
                    onClick={this.onCancel}
                    block
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
          <CardText>
            <Row>
              <Col md='auto' xs='auto'>
                <small className='text-muted'>{date}</small>
              </Col>
              <Col className='text-md-right'>
                <small className='text-muted'>15 Agrees</small>
              </Col>
            </Row>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default ResponseEdit;
