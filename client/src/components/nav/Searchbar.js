import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import {
  Form,
  FormGroup
} from 'reactstrap';
import theme from './themes/searchbar.css';
import Autosuggest from 'react-autosuggest';
import deburr from 'lodash/deburr';

var suggestions;

axios.get('/api/users')
  .then(res => {
    suggestions = res.data;
  });

const getSuggestions = value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.name.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => {
  return (
    <span>{suggestion.name}</span>
  );
}

class Searchbar extends Component {
  state = {
    value: '',
    suggestions: []
  };

  componentDidMount() {
    axios.get('/api/users')
      .then(res => {
        suggestions = res.data;
      });
  };

  onChange = (e, { newValue, method }) => {
    this.setState({ value: newValue });
  };

  onSubmit = e => {
    e.preventDefault();

    axios.get(`/api/users/${this.state.value}`)
      .then(res => {
        if (this.state.value && res.data)
          this.props.history.push(`/${this.state.value}/profile`);
      });
  }

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange,
    };

    return(
      <div>
        <Form onSubmit={this.onSubmit}>
          <FormGroup className='mt-2 mb-1'>
            <Autosuggest
              className={theme}
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default withRouter(Searchbar);
