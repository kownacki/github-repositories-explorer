import React from 'react';
import _ from 'lodash/fp';
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import * as github from '../github.js';
import DropdownItem from './DropdownItem.jsx';
import {connect} from 'react-redux';
import {startFetchRepos, successFetchRepos, failureFetchRepos} from '../redux/actions.js';
import {LOADING_REPOS, SUCCESS_REPOS, FAILURE_REPOS} from '../redux/actionTypes.js';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      onceOpened: false,
    }
  }
  handleClick() {
    this.setState((state) => ({open: !state.open}))
  }
  async componentDidUpdate() {
    if (this.state.open && !this.state.onceOpened) {
      this.setState({onceOpened: true});
      this.props.startFetchRepos(this.props.userID);
      const repos = await github.getRepos(this.props.username);
      if (repos) {
        this.props.successFetchRepos(this.props.userID, repos);
      } else {
        this.props.failureFetchRepos(this.props.userID);
      }
    }
  }
  render() {
    const userState = this.props.users[this.props.index];
    return (
      <div>
        <div className="dropdown-button" onClick={this.handleClick.bind(this)}>
          <div className="dropdown-button-username">{this.props.username}</div>
          {this.state.open ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        {!this.state.open
          ? ''
          : userState.reposStatus === LOADING_REPOS
          ? <div className="dropdown-info">Loading repositories</div>
          : userState.reposStatus === SUCCESS_REPOS
          ? <>
              {userState.repos.length
                ?
                  <ul>
                    {userState.repos.map((repo) =>
                      <li key={repo.id}><DropdownItem repo={repo} /></li>
                    )}
                  </ul>
                :
                 <div className="dropdown-info">No repositories found.</div>
              }
            </>
          : userState.reposStatus === FAILURE_REPOS
          ? <div className="dropdown-info">Something went wrong when fetching data. Try again in a minute</div>
          : ''}
      </div>
    );
  }
}

export default connect(
  _.pick(['users']),
  {startFetchRepos, successFetchRepos, failureFetchRepos},
)(Dropdown);
