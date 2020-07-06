import React from 'react';
import * as github from '../github.js';
import SearchResults from './SearchResults.jsx';
import {connect} from 'react-redux';
import {failureSearchForUsers, startSearchForUsers, successSearchForUsers} from '../redux/actions.js';
import {LOADING_USERS} from '../redux/actionTypes.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
    }
  }
  async handleClick() {
    this.props.startSearchForUsers(this.state.searchInputText);
    const users = await github.getUsers(this.state.searchInputText);
    if (users) {
      this.props.successSearchForUsers(users.map((user) => ({id: user.id, name: user.login})));
    } else {
      this.props.failureSearchForUsers();
    }
  }
  render() {
    return (
      <div className="app">
        <input
          className="search-input"
          placeholder="Enter username"
          onInput={(event) => this.setState({searchInputText: event.target.value})}
          type="text"
        />
        <button
          className="search-button"
          disabled={!this.state.searchInputText || this.props.reduxState.usersStatus === LOADING_USERS}
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
