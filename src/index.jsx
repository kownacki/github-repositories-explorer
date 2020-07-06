import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux'
import './index.css';
import * as github from './github.js';
import store from './redux/store.js';
import {startSearchForUsers, successSearchForUsers, failureSearchForUsers} from './redux/actions.js'
import SearchResults from './SearchResults.jsx';

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

const ConnectedApp = connect(
  (state) => ({reduxState: state}),
  {startSearchForUsers, successSearchForUsers, failureSearchForUsers},
)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
