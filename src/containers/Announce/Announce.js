import React, { Component,PropTypes } from 'react';
export default class Home extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
