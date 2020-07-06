import React from 'react';
import * as github from '../github.js';
import SearchResults from './SearchResults.jsx';
import {connect} from 'react-redux';
import {failureSearchForUsers, startSearchForUsers, successSearchForUsers} from '../redux/actions.js';
import {LOADING} from '../redux/actionTypes.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
    }
  }
  async handleClick() {
    this.props.startSearchForUsers(this.state.searchInputText);
    const result = await github.getUsers(this.state.searchInputText);
    if (result) {
      this.props.successSearchForUsers(result);
    } else {
      this.props.failureSearchForUsers();
    }
  }
  render() {
    return (
      <div>
        <input
          className="search-input"
          onInput={(event) => this.setState({searchInputText: event.target.value})}
          type="text"
        />
        <button
          className="search-button"
          disabled={this.props.reduxState.type === LOADING}
          onClick={this.handleClick.bind(this)}
        >
          Search
        </button>
        <SearchResults />
      </div>
    );
  }
}

export default connect(
  (state) => ({reduxState: state}),
  {startSearchForUsers, successSearchForUsers, failureSearchForUsers},
)(App);
