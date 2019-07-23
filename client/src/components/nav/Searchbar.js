import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Input
} from 'reactstrap';

class Searchbar extends Component {
  state = {
    search: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onKeyDown = e => {
    if (e.key === 13) this.onSubmit();
  };

  onSubmit = e => {
    e.preventDefault();

    axios.get(`/api/users/${this.state.search}`)
      .then(res => {
        if (this.state.search && res.data)
          this.props.history.push(`/${this.state.search}/profile`);
      });
  }

  render() {
    return(
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup className='mt-1 mb-0'>
            <Input
              bsSize='sm'
              style={{ width: 300 }}
              type='search'
              id='search'
              name='search'
              placeholder='Search'
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(Searchbar);
