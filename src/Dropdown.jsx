import React from 'react';
import {AiFillStar, AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import * as github from './github.js';

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
        <div onClick={this.toggleOpen.bind(this)}>
          {this.props.username} {this.state.open ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        <ul>
          {/* todo add info when no repos */}
          {this.state.open && this.state.repos && this.state.repos.map((repo) =>
            <li key={repo.id}>{repo.name} <AiFillStar /></li>
          )}
        </ul>
      </div>
    );
  }
}
