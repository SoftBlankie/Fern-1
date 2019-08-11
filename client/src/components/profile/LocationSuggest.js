import React, { Component } from 'react';
import {

} from 'reactstrap';

import Autosuggest from 'react-autosuggest';
import deburr from 'lodash/deburr';

const getSuggestions = value => {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : 
}

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => {
  return (
    <span>{suggestion.name}</span>
  );
}

class LocationSuggest extends Component {
  state = {
    value: '',
    suggestions: []
  };

  onChange = (e, { newValue, method }) => {
    this.setState({ value: newValue });
  };

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
      placeholder: 'Location',
      value,
      onChange: this.onChange,
    };

    return(
      <div>
        <Form>
          <FormGroup className='mt-2 mb-1'>
            <Autosuggest
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

export default LocationSuggest;
