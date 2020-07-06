import React from 'react';
import {connect} from 'react-redux';
import {LOADING_USERS, SUCCESS_USERS, FAILURE_USERS} from '../redux/actionTypes.js';
import Dropdown from './Dropdown.jsx';

class SearchResults extends React.Component {
  render() {
    return (
      <div>
        {this.props.reduxState.usersStatus === LOADING_USERS
          ? <>Loading users for "{this.props.reduxState.query}"</>
          : this.props.reduxState.usersStatus === SUCCESS_USERS
          ? <>
              Showing users for "{this.props.reduxState.query}"
              {this.props.reduxState.users.length
                ? (
                <ul>
                  {this.props.reduxState.users.map((user, index) =>
                    <li key={user.id}><Dropdown username={user.name} index={index} userID={user.id} /></li>
                  )}
                </ul>
                )
                : (
                  <div>No user found.</div>
                )
              }
            </>
          : this.props.reduxState.usersStatus === FAILURE_USERS
          ? 'Something went wrong when fetching data. Try again in a minute'
          : ''
        }
      </div>
    );
  }
}

export default connect((state) => ({reduxState: state}), {})(SearchResults);
