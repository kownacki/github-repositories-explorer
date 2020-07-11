import React from 'react';
import {AiFillStar} from 'react-icons/ai';

export default class DropdownItem extends React.Component {
  render() {
    const {repo} = this.props;
    return (
      <div className="dropdown-item">
        <div className="dropdown-item-header">
          <div className="dropdown-item-header-left">
            {repo.name}
          </div>
          <div className="dropdown-item-header-right">
            {repo.watchers} <AiFillStar />
          </div>
        </div>
        <div className="dropdown-item-body">
          {repo.description}
        </div>
      </div>
    );
  }
}
