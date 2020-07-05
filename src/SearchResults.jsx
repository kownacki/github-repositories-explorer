import React from 'react';
import Dropdown from './Dropdown.jsx';
import * as github from './github.js';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    }
  }
  async componentDidUpdate(prevProps) {
    if (this.props.searchQuery !== prevProps.searchQuery) {
      const query = this.props.searchQuery.replace(' ', '+');
      // todo race condition
      this.setState({users: await github.getUsers(query)});
    }
  }
  render() {
    return (
      <div>
        Showing users for "{this.props.searchQuery}"
        <ul>
          {this.state.users && this.state.users.map((user) =>
            // todo how about username instead of login ??
            <li key={user.id}><Dropdown username={user.login}  /></li>
          )}
        </ul>
        <br />
      </div>
    );
  }
}
