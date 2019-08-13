import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import deburr from 'lodash/deburr';
import suggestions from '../countries';
import theme from './themes/inputSuggest.css';

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

class LocationSuggest extends Component {
  state = {
    value: this.props.value,
    suggestions: []
  };

  onChange = (e, { newValue, method }) => {
    this.setState({ value: newValue });
    this.props.onLocation(newValue);
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
      placeholder: 'location',
      value,
      onChange: this.onChange,
    };

    return(
      <div>
        <Autosuggest
          className={theme}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}

export default LocationSuggest;
