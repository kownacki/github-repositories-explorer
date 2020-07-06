import React from 'react';
import {AiFillStar} from 'react-icons/ai';

export default class DropdownItem extends React.Component {
  render() {
    return (
      <div className="dropdown-item">
        <div className="dropdown-item-header">
          <div className="dropdown-item-header-left">
            {this.props.repo.name}
          </div>
          <div className="dropdown-item-header-right">
            {this.props.repo.watchers} <AiFillStar />
          </div>
        </div>
        <div className="dropdown-item-body">
          {this.props.repo.description}
        </div>
      </div>
    );
  }
}
