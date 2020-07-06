import React from 'react';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import * as github from '../github.js';
import DropdownItem from './DropdownItem.jsx';

export default class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      onceOpened: false,
      repos: null,
    }
  }
  toggleOpen() {
    this.setState((state) => ({open: !state.open}))
  }
  async componentDidUpdate() {
    if (!this.state.onceOpened) {
      this.setState({onceOpened: true});
      this.setState({repos: await github.getRepos(this.props.username)});
    }
  }
  render() {
    return (
      <div>
        <div className="dropdown-button" onClick={this.toggleOpen.bind(this)}>
          <div className="dropdown-button-username">{this.props.username}</div>
          {this.state.open ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        <ul>
          {/* todo add info when no repos */}
          {this.state.open && this.state.repos && this.state.repos.map((repo) =>
            <li key={repo.id}><DropdownItem repo={repo} /></li>
          )}
        </ul>
      </div>
    );
  }
}
