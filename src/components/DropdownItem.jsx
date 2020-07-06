import React from 'react';
import {AiFillStar} from 'react-icons/ai';

export default class DropdownItem extends React.Component {
  render() {
    return (
      <div>
        {this.props.repo.name}
        <br />
        {this.props.repo.description}
        {this.props.repo.watchers} <AiFillStar />
      </div>
    );
  }
}
