import React from 'react';
import * as github from '../github.js';
import SearchResults from './SearchResults.jsx';
import {connect} from 'react-redux';
import {failureSearchForUsers, startSearchForUsers, successSearchForUsers} from '../redux/actions.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
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
        <button className="search-button" onClick={async () => {
          this.props.startSearchForUsers(this.state.searchInputText);
          // todo race condition
          const result = await github.getUsers(this.state.searchInputText);
          if (result) {
            this.props.successSearchForUsers(result);
          } else {
            this.props.failureSearchForUsers();
          }
        }}>Search</button>
        <SearchResults />
      </div>
    );
  }
}

export default connect(
  (state) => ({reduxState: state}),
  {startSearchForUsers, successSearchForUsers, failureSearchForUsers},
)(App);
