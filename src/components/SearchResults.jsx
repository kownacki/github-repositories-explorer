import React from 'react';
import {connect} from 'react-redux';
import {LOADING, SUCCESS, FAILURE} from '../redux/actionTypes.js';
import Dropdown from './Dropdown.jsx';

class SearchResults extends React.Component {
  render() {
    return (
      <div>
        {this.props.reduxState.type === LOADING
          ? <>Loading users for "{this.props.reduxState.query}"</>
          : this.props.reduxState.type === SUCCESS
          ? <>
              Showing users for "{this.props.reduxState.query}"
              <ul>
                {this.props.reduxState.users && this.props.reduxState.users.map((user) =>
                  // todo how about username instead of login ??
                  <li key={user.id}><Dropdown username={user.login}  /></li>
                )}
              </ul>
            </>
          : this.props.reduxState.type === FAILURE
          ? 'Something went wrong when fetching data. Try again in a minute'
          : ''
        }
      </div>
    );
  }
}

export default connect((state) => ({reduxState: state}), {})(SearchResults);
